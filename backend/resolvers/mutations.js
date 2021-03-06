const { ApolloError, AuthenticationError } = require('apollo-server-express')
const ShortUniqueId = require('short-unique-id').default;
const { OAuth2Client } = require('google-auth-library');

// Mongoose Models
const User = require('../models/User');
const Course = require('../models/Course');
const Class = require('../models/Class');
const Playlist = require('../models/Playlist');
const Objective = require('../models/Objective');
const Request = require('../models/Request');
const Resource = require('../models/Resource');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const Score = require('../models/Score');
const Task = require('../models/Task');
const jwt = require('jsonwebtoken');
const Auth = require('../lib/Auth');

const hasPermission = require('../lib/hasPermission')

const authExpire = 1000 * 60 * 15; // 15 min - 900,000ms
const refreshExpire = 1000 * 60 * 60 * 24 * 7; // 7 days - 604,800,000ms

const sameSite = process.env.NODE_ENV == 'production' ? 'none' : false;
const secure = process.env.NODE_ENV == 'production';

const mutations = {
  async login(parent, args, context, info) {
    const client = new OAuth2Client('740708519996-jckm5svthu1lh5fv35jc55pp54kam9br');
    const token = args.authToken;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '740708519996-jckm5svthu1lh5fv35jc55pp54kam9br.apps.googleusercontent.com',  // Specify the CLIENT_ID of the app that accesses the backend
    });
    const payload = ticket.getPayload();
    const user = await User.findOne({ googleId: payload.sub });

    // If user already exists, authorize login
    if (user !== null) {
      const authToken = Auth.createAuthToken(user);
      const refreshToken = Auth.createRefreshToken(user);
      await context.res.cookie('ALPS_AT', authToken, {
        httpOnly: true,
        expires: new Date(Date.now() + authExpire), // 1000ms * 60s * 15m
        sameSite: sameSite,
        secure: secure,
      });
      await context.res.cookie('ALPS_RT', refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + refreshExpire), // 1000 * 60 * 60 * 24 * 7
        sameSite: sameSite,
        secure: secure,
      });
      return authToken;
    }

    // if user does not exists, add user to db and login
    if (user === null) {
      return new AuthenticationError('User does not exist!. Please create an account first.')
    }
  },

  async createAccount(parent, args, context, info) {
    const client = new OAuth2Client('740708519996-jckm5svthu1lh5fv35jc55pp54kam9br');
    const token = args.authToken;
    const userType = args.userType;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '740708519996-jckm5svthu1lh5fv35jc55pp54kam9br.apps.googleusercontent.com',  // Specify the CLIENT_ID of the app that accesses the backend
    });
    const payload = ticket.getPayload();
    const userCheck = await User.findOne({ googleId: payload.sub });
    if (userCheck) {
      return new AuthenticationError('Account already exists, please log in to your account.')
    }
    const user = new User({
      firstName: payload.given_name,
      lastName: payload.family_name,
      name: payload.name,
      email: payload.email,
      googleId: payload.sub,
      picture: payload.picture,
      roles: userType,
    })
    const newUser = await user.save()
    const createdUser = await User.findOne({ googleId: payload.sub });
    const authToken = Auth.createAuthToken(createdUser);
    const refreshToken = Auth.createRefreshToken(createdUser);
    await context.res.cookie('ALPS_AT', authToken, {
      httpOnly: true,
      expires: new Date(Date.now() + authExpire),
      sameSite: sameSite,
      secure: secure,
    });
    await context.res.cookie('ALPS_RT', refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + refreshExpire),
      sameSite: sameSite,
      secure: secure,
    });
    return newUser;
  },

  async logout(parent, args, context, info) {
    context.res.clearCookie('ALPS_AT', {
      sameSite: sameSite,
      secure: secure,
    });
    context.res.clearCookie('ALPS_RT', {
      sameSite: sameSite,
      secure: secure,
    });
    return 'Bye!'
  },

  async enroll(parent, args, context, info) {
    const { currentUser } = context;
    if (!currentUser) return new ApolloError('Unable to enroll in course, must log in.')
    const classEnrolled = await Class.findOne({ enrollId: args.enrollId }).select('enrolled');
    const enrolledIds = classEnrolled.enrolled.map(enrolled => enrolled._id);
    if (enrolledIds.includes(currentUser._id)) return new ApolloError('Already enrolled in this class!')
    classEnrolled.enrolled.push(currentUser._id);
    await classEnrolled.save();
    return classEnrolled;
  },

  async removeEnrollment(parent, args, context, info) {
    const aClass = await Class.findById(args.classId);
    const studentIds = aClass.enrolled.map(student => student._id);
    const studentToRemove = studentIds.indexOf(args.studentId);
    aClass.enrolled.splice(studentToRemove, 1);
    return await aClass.save();
  },

  async createCourse(parent, args, context, info) {
    const { currentUser } = context;
    if (!currentUser.roles.includes('STUDENT')) {
      const shortuid = new ShortUniqueId();
      const newCourse = new Course({
        enrollId: await shortuid.randomUUID(8),
        owner: currentUser._id,
        ...args //spread incomming data from form
      })
      const createdCourse = await newCourse.save().catch((err) => { console.error(err) });
      return createdCourse;
    }
    return 'Permission Denied!';
  },

  async createClass(parent, args, context, info) {
    const { currentUser } = context;
    if (!currentUser.roles.includes('STUDENT')) {
      const shortuid = new ShortUniqueId();
      const newClass = new Class({
        primaryInstructor: currentUser._id,
        enrollId: await shortuid.randomUUID(8),
        ...args //spread incomming data from form
      })
      return await newClass.save().catch((err) => { console.error(err) });
    }
    return 'Cannot create as student!';
  },

  async createPlaylist(parent, args, context, info) {
    const { currentUser } = context;
    if (!currentUser.roles.includes('STUDENT')) {
      const parentCourse = await Course.findById(args.course);
      const newPlaylist = new Playlist({
        grade: parentCourse.grade,
        ...args //spread incomming data from form
      })
      // save playlist to DB
      const createdPlaylist = await newPlaylist.save().catch((err) => { console.error(err) });
      // add playlist to parentCourse (and prevent duplication)
      const playlistType = args.type.toLowerCase();
      if (!parentCourse[`${playlistType}Playlists`].includes(createdPlaylist._id)) {
        parentCourse[`${playlistType}Playlists`].push(createdPlaylist._id);
        await parentCourse.save();
      }
      return createdPlaylist;
    }
    return null;
  },

  async createObjective(parent, args, context, info) {
    const { currentUser } = context;
    if (currentUser.permissions !== 'STUDENT') {
      const parentPlaylist = await Playlist.findById(args.playlist);
      const newObjective = new Objective({
        order: parentPlaylist.objectives.length + 1,
        ...args
      })
      const createdObjective = await newObjective.save().catch((err) => { console.error(err) });
      parentPlaylist.objectives.push(newObjective._id);
      await parentPlaylist.save().catch((err) => { console.log(err) });
      return createdObjective;
    }
    return 'Permission Denied!';
  },

  async createRequest(parent, args, context, info) {
    const { currentUser } = context;
    const requestExists = await Request.exists({ playlist: args.playlistId });
    if (!requestExists) {
      const quiz = await Quiz.findOne({ playlist: args.playlistId });
      const currentTime = Date.now();
      const request = new Request({
        approved: false,
        approvalAccepted: false,
        user: currentUser._id,
        playlist: args.playlistId,
        type: quiz.type,
        timeRequested: currentTime,
        ...args,
      })
      return await request.save().catch(err => { console.log(err) });
    }
    return new ApolloError('Request has already been submitted.');
  },

  async createResource(parent, args, context, info) {
    const { currentUser } = context;
    const resource = new Resource({
      objective: args.objective,
      name: args.name,
      description: args.description,
      href: args.href,
      type: args.type,
    });
    const savedResource = await resource.save().catch(err => console.error(err));
    const parentObjective = await Objective.findById(args.objective);
    await parentObjective.resources.push(savedResource._id);
    await parentObjective.save();
    return savedResource;
  },

  async createScore(parent, args, context, info) {
    const { currentUser } = context;
    const userId = args.userId ? args.userId : context.currentUser._id;
    const quiz = await Quiz.findOne({ playlist: args.playlistId });
    const score = new Score({
      user: userId,
      playlist: args.playlistId,
      score: args.score || null,
      possibleScore: args.possibleScore || quiz.possibleScore,
      timeCreated: Date.now(),
      timeScored: args.timeScored || null,
    })
    return await score.save().catch(() => { return new ApolloError('Unable to create a new score') });
  },

  async updateResourceOrder(parent, args, context, info) {
    const { objectiveId, source, destination } = args;
    const objective = await Objective.findById(objectiveId);
    const resourceIds = objective.resources.map(resource => resource._id);
    const movedResource = resourceIds[source];
    resourceIds.splice(source, 1);
    resourceIds.splice(destination, 0, movedResource);
    objective.resources = [...resourceIds];
    return await objective.save();
  },

  async updateObjectiveOrder(parent, args, context, info) {
    const { playlistId, source, destination } = args;
    const playlist = await Playlist.findById(playlistId);
    const objectiveIds = playlist.objectives.map(objective => objective._id);
    const movedObjective = objectiveIds[source];
    objectiveIds.splice(source, 1);
    objectiveIds.splice(destination, 0, movedObjective);
    playlist.objectives = [...objectiveIds];
    return await playlist.save();
  },

  async updatePlaylistOrder(parent, args, context, info) {
    const { courseId, playlistType, source, destination } = args;
    const course = await Course.findById(courseId);
    const playlistIds = course[`${playlistType.toLowerCase()}Playlists`].map(playlist => playlist._id);
    const movedPlaylist = playlistIds[source];
    playlistIds.splice(source, 1);
    playlistIds.splice(destination, 0, movedPlaylist);
    course[`${playlistType.toLowerCase()}Playlists`] = [...playlistIds];
    return await course.save();
  },

  async updatePlaylistDescription(parent, args, context, info) {
    const { playlistId, description } = args;
    return await Playlist.updateOne({ _id: playlistId }, { description: description });
  },

  async updateObjective(parent, args, context, info) {
    const { name, objectiveId, description } = args;
    return await Objective.updateOne({ _id: objectiveId }, {
      name: name,
      description: description,
    })
  },

  async updateCourse(parent, args, context, info) {
    const { currentUser } = context;
    const { courseId, name, subject, grade, section, description, startDate, endDate } = args;
    const course = await Course.findById(courseId).select('owner');
    if (course.owner != currentUser._id) return new ApolloError(`You do not own this course!`)
    course.courseId = courseId;
    course.name = name;
    course.subject = subject;
    course.grade = grade;
    course.section = section;
    course.description = description;
    course.startDate = startDate;
    course.endDate = endDate;
    return await course.save();
  },

  async updatePlaylist(parent, args, context, info) {
    const { currentUser } = context;
    const { playlistId, name, description, type } = args;
    const playlist = await Playlist.findById(playlistId);
    const course = await Course.findById(playlist.course._id);
    const contributors = course.contributors.map(user => user._id);

    if (currentUser._id == course.owner || contributors.includes(currentUser._id)) {
      if (playlist.type != type) {
        const oldTypeArray = `${playlist.type.toLowerCase()}Playlists`;
        const oldTypeArrayIndex = course[oldTypeArray].findIndex(playlist => playlist._id == playlistId);
        course[oldTypeArray].splice(oldTypeArrayIndex, 1);
        course[`${type.toLowerCase()}Playlists`].push(playlistId);
        await course.save();
      }
      playlist.name = name;
      playlist.description = description;
      playlist.type = type;
      return await playlist.save()
    } else {
      return new ApolloError('You do not have permission to edit this playlist');
    }
  },

  async updateResource(parent, args, context, info) {
    const { resourceId, name, description, type, href } = args;
    const resource = await Resource.findOne({ _id: resourceId });
    resource.name = name;
    resource.description = description;
    resource.type = type;
    resource.href = href;
    return await resource.save();
  },

  async updateScore(parent, args, context, info) {
    const { scoreId, score, possibleScore } = args;
    return await Score.updateOne({ _id: scoreId }, {
      score: score,
      possibleScore: possibleScore,
      timeScored: Date.now(),
      scoredBy: context.currentUser._id,
    });
  },

  async deleteResource(parent, args, context, info) {
    // remove from parent objective
    const { objective: objId } = await Resource.findById(args.resourceId).select('objective');
    const objective = await Objective.findById(objId);
    const resourceToRemove = objective.resources.findIndex(resource => resource._id == args.resourceId);
    objective.resources.splice(resourceToRemove, 1);
    objective.save()
    // remove actual resource
    return await Resource.deleteOne({ _id: args.resourceId });
  },

  async deleteObjective(parent, args, context, info) {
    const { objectiveId } = args;
    const objective = await Objective.findById(objectiveId);
    const parentPlaylist = await Playlist.findById(objective.playlist)
    const objArrIndex = parentPlaylist.objectives.findIndex(obj => obj._id == objectiveId);
    parentPlaylist.objectives.splice(objArrIndex, 1);
    parentPlaylist.save()
    return await Objective.deleteOne({ _id: objectiveId });
  },

  async deleteCourse(parent, args, context, info) {
    const { currentUser } = context;
    const { courseId } = args;
    const course = await Course.findById(args.courseId).select('owner');
    if (currentUser._id == course.owner) {
      return await Course.deleteOne({ _id: courseId });
    }
    return new ApolloError('Cannot remove course. You must be the owner to remove the course.')
  },

  async deletePlaylist(parent, args, context, info) {
    const { currentUser } = context;
    const { playlistId } = args;
    const playlist = await Playlist.findById(playlistId);
    const course = await Course.findById(playlist.course);
    if (course.owner == currentUser._id) {
      // delete playlist from array of playlists in course
      const typePlaylists = [...course[`${playlist.type.toLowerCase()}Playlists`]]; //array of course.[type]Playlists
      const playlistToRemoveIndex = typePlaylists.findIndex(playlist => playlist._id == playlistId); //index of PL to delete
      typePlaylists.splice(playlistToRemoveIndex, 1);
      course[`${playlist.type.toLowerCase()}Playlists`] = [...typePlaylists];
      // delete actual playlist object and save updated course
      await course.save()
      await playlist.remove()
      return playlist
    } else { return null }
  },

  async approveRequest(parent, args, context, info) {
    const request = await Request.findById(args.requestId);
    request.approved = true;
    const currentTime = Date.now();
    request.timeApproved = currentTime;
    request.markModified('timeApproved');
    return await request.save();
  },

  async cancelRequest(parent, args, context, info) {
    const request = await Request.findById(args.requestId);
    request.approved = false;
    return await request.save();
  },

  async deleteRequest(parent, args, context, info) {
    const request = await Request.deleteOne({ _id: args.requestId });
    if (request.deletedCount) {
      return 1
    } else {
      return new ApolloError('Error deleting the current quiz request.');
    }
  },

  async createQuiz(parent, args, context, info) {
    const quizExists = await Quiz.exists({ playlist: args.playlistId });
    if (!quizExists) {
      const newQuiz = new Quiz({
        playlist: args.playlistId,
        type: args.type,
        externalLink: args.externalLink,
        externalResponsesLink: args.externalResponsesLink,
        possibleScore: args.possibleScore,
      })
      return await newQuiz.save();
    }
    return null
  },

  async updateQuiz(parent, args, context, info) {
    return await Quiz.updateOne({ playlist: args.playlistId }, {
      type: args.type,
      externalLink: args.externalLink,
      externalResponsesLink: args.externalResponsesLink,
      possibleScore: args.possibleScore,
    });
  },

  async acceptQuizApproval(parent, args, context, info) {
    const request = await Request.findOne({ _id: args.requestId });
    request.approvalAccepted = true,
      request.timeAccepted = Date.now();
    request.markModified('timeAccepted');
    await request.save();
    return request;
  },

  async updateClass(parent, args, context, info) {
    const { currentUser } = context;
    const aClass = await Class.findById(args.classId);
    // return error if user isn't owner of course
    if (currentUser._id != aClass.primaryInstructor._id || aClass.secondaryInstructors.map(i => i._id).includes(currentUser._id)) {
      return new ApolloError('Must be instructor in order to update')
    }
    // update course if class is moved.
    if (aClass.course != args.courseId) {
      //remove class from old course
      const oldCourse = await Course.findById(aClass.course);
      const oldCourseClasses = oldCourse.classes.map(c => c._id);
      const classToRemove = oldCourseClasses.indexOf(aClass._id);
      oldCourse.classes.splice(classToRemove, 1);
      oldCourse.save();
      // add class to new course
      const newCourse = await Course.findById(args.courseId);
      newCourse.classes.push(args.classId);
      newCourse.save();
    }
    //update actual class
    aClass.course = args.courseId;
    aClass.name = args.name;
    return await aClass.save();
  },

  async deleteClass(parent, args, context, info) {
    const { currentUser } = context;
    const classToDelete = await Class.findById(args.classId);
    if (classToDelete.primaryInstructor._id != currentUser._id) return new ApolloError('Cannot delete class unless you are the primary instructor.')
    const aClass = await Class.deleteOne({ _id: args.classId });
    if (aClass.deletedCount) {
      return 1
    } else {
      return new ApolloError('Error deleting the class.');
    }
  },

  async deleteStudent(parent, args, context, info) {
    const { currentUser } = context;

    const classesToRemoveStudent = await Class.find({
      $or: [
        { primaryInstructor: currentUser._id }, // user is primary
        { secondaryInstructors: { $in: currentUser._id } } // or user is in the secondary
      ]
    })
    classesToRemoveStudent.forEach(async enrolledClass => {
      const classToUnenroll = await Class.findById(enrolledClass._id);
      const arrayOfEnrolled = classToUnenroll.enrolled.map(student => student._id);
      const studentInEnrolledArray = arrayOfEnrolled.indexOf(args.studentId);
      if (studentInEnrolledArray != -1) {
        // if you don't check for -1 (no in array), splice will delete starting from end
        classToUnenroll.enrolled.splice(studentInEnrolledArray, 1);
      }
      await classToUnenroll.save()
    })
    return args.studentId;
  },

  async deleteScore(parent, args, context, info) {
    const deleted = await Score.deleteOne({ _id: args.scoreId });
    if (deleted.n == 1) {
      return args.scoreId
    } else {
      return new ApolloError('Unable to delete score.')
    }
  },

  async createTask(parent, args, context, info) {
    const { currentUser } = context;
    const task = new Task({
      user: currentUser._id,
      description: args.description,
      type: args.type,
      playlist: args.playlistId || null,
      class: args.classId || null,
    })
    const saved = await task.save().catch(err => { return new ApolloError('Problem saving!') });
    return task;
  },

  async deleteTask(parent, args, context, info) {
    const deleted = await Task.deleteOne({ _id: args.taskId });
    if (deleted.deletedCount == 1) {
      return args.taskId;
    } else {
      return new ApolloError('Unable to delete task.');
    }
  },

  async createCourseContributor(parent, args, context, info) {
    const { currentUser } = context;
    const course = await Course.findById(args.courseId);
    // if current user is owner or contributor, add contributor
    if (course.owner == currentUser._id || course.contributors.indexOf(currentUser._id) > -1) {
      const newContributor = await User.findOne({ email: args.contributorEmail });
      if (hasPermission(newContributor, ['TEACHER', 'ADMIN', 'SUPER_ADMIN'])) {
        course.contributors.push(newContributor._id)
        await course.save();
        return course;
      }
      return new ApolloError('Unable to add contributor unless user is Teacher or Admin.')
    }
    return new ApolloError('Unable to add contributor.')
  }
}
module.exports = mutations;