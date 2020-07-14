const { ApolloError } = require('apollo-server-express')
const ShortUniqueId = require('short-unique-id').default;

const { pubsub } = require('./pubsub');

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

const mutations = {
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
      const parentCourse = await Course.findById(args.course);
      const shortuid = new ShortUniqueId();
      const newClass = new Class({
        primaryInstructor: currentUser._id,
        enrollId: await shortuid.randomUUID(8),
        ...args //spread incomming data from form
      })
      const createdClass = await newClass.save().catch((err) => { console.error(err) });
      if (!parentCourse.classes.includes(createdClass._id)) {
        parentCourse.classes.push(createdClass._id);
        await parentCourse.save();
      }
      return createdClass;
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
      const request = new Request({
        approved: false,
        approvalAccepted: false,
        user: currentUser._id,
        playlist: args.playlistId,
        ...args,
      })
      const newRequest = await request.save().catch(err => { console.log(err) });
      return request;
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
    const score = new Score({
      user: currentUser._id,
      playlist: args.playlistId,
      score: null,
      possibleScore: null,
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
    const course = await Course.findById(playlist.course._id)
    if (currentUser._id != course.owner) return new ApolloError('You do not hav permission to edit this playlist');

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
  },

  async updateResource(parent, args, context, info) {
    const { resourceId, name, description, type, href } = args;
    return await Resource.updateOne({ _id: resourceId }, {
      name: name,
      description: description,
      type: type,
      href: href,
    })
  },

  async updateScore(parent, args, context, info) {
    const { scoreId, score, possibleScore } = args;
    return await Score.updateOne({ _id: scoreId }, {
      score: score,
      possibleScore: possibleScore,
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
    return await request.save();
    // return request;
  },

  async cancelRequest(parent, args, context, info) {
    const request = await Request.findById(args.requestId);
    request.approved = false;
    return await request.save();
    // return request;
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
      })
      return await newQuiz.save();
    }
    return null
  },

  async updateQuiz(parent, args, context, info) {
    return await Quiz.updateOne({ playlist: args.playlistId }, {
      externalLink: args.externalLink,
    });
  },

  async acceptQuizApproval(parent, args, context, info) {
    return await Request.updateOne({ _id: args.requestId }, {
      approvalAccepted: true,
    });
  },
}
module.exports = mutations;