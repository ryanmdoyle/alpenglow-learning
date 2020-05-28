const { ApolloError } = require('apollo-server-express')
const ShortUniqueId = require('short-unique-id').default;

const verifyUser = require('../lib/verifyUser');

// Mongoose Models
const User = require('../models/User');
const Course = require('../models/Course');
const Class = require('../models/Class');
const Playlist = require('../models/Playlist');
const Objective = require('../models/Objective');

const mutations = {

  async createCourse(parent, args, context, info) {
    const { currentUser } = context;
    if (!currentUser.roles.includes('STUDENT')) {
      const userInDb = await User.findById(currentUser._id);
      const shortuid = new ShortUniqueId();
      const newCourse = new Course({
        enrollId: await shortuid.randomUUID(8),
        owner: currentUser._id,
        ...args //spread incomming data from form
      })
      const createdCourse = await newCourse.save().catch((err) => { console.error(err) });
      if (!userInDb.instructingCourses.includes(createdCourse._id)) {
        userInDb.instructingCourses.push(createdCourse._id);
        await userInDb.save();
      }
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
        order: parentCourse.playlists.length + 1, // set order to last, according to parent array length
        ...args //spread incomming data from form
      })
      // save playlist to DB
      const createdPlaylist = await newPlaylist.save().catch((err) => { console.error(err) });
      // add playlist to parentCourse (and prevent duplication)
      if (!parentCourse.playlists.includes(createdPlaylist._id)) {
        parentCourse.playlists.push(createdPlaylist._id);
        await parentCourse.save();
      }
      return createdPlaylist;
    }
    return 'Permission Denied!';
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

  async enroll(parent, args, context, info) {
    const { currentUser } = context;

    if (currentUser) {
      const userInDb = await User.findById(currentUser._id);
      const classToEnroll = await Class.findOne({ enrollId: args.enrollId });

      // Add class to a Users enrolledClasses
      if (!userInDb.enrolledClasses.includes(classToEnroll._id)) {
        userInDb.enrolledClasses.push(classToEnroll._id);
        await userInDb.save();
      } else {
        return new ApolloError(`User is already enrolled in this class.`);
      }

      // Adds User to list of enrolled students in Class
      if (!classToEnroll.enrolled.includes(userInDb._id)) {
        classToEnroll.enrolled.push(userInDb._id);
        await classToEnroll.save();
      } else {
        return new ApolloError(`Class already has this user as an enrolled student.`);
      }
      return userInDb;
    }
    return 'Not logged in!'
  }
}
module.exports = mutations;