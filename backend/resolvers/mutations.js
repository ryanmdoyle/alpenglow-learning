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
      const newObjective = new Objective({
        ...args
      })
      const createdObjective = await newObjective.save().catch((err) => { console.error(err) });
      console.log('createdObj in mutation res\n', createdObjective);
      return createdObjective;
    }
    return 'Permission Denied!';
  },

  async enroll(parent, args, context, info) {
    const { currentUser } = context;
    if (currentUser && !currentUser.roles.includes('STUDENT')) {
      const userInDb = await User.findById(currentUser._id);
      const courseToEnroll = await Course.findOne({ enrollId: args.enrollId });

      if (!userInDb.enrolledCourses.includes(courseToEnroll._id)) { // if not already enrolled
        userInDb.enrolledCourses.push(courseToEnroll._id);
        await userInDb.save();
      } else {
        return new ApolloError('Already Enrolled in course');
      }
      return userInDb;
    }
    return 'Not a student!'
  }
}
module.exports = mutations;