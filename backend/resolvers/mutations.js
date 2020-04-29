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
  async createUser(parent, args, context, info) {

    const { OAuth2Client } = require('google-auth-library');
    const client = new OAuth2Client('740708519996-jckm5svthu1lh5fv35jc55pp54kam9br');

    const token = args.token;

    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: '740708519996-jckm5svthu1lh5fv35jc55pp54kam9br.apps.googleusercontent.com',  // Specify the CLIENT_ID of the app that accesses the backend
      });
      const payload = await ticket.getPayload();
      const newUser = new User({
        firstName: payload.given_name,
        lastName: payload.family_name,
        name: payload.name,
        email: payload.email,
        googleId: payload.sub,
        picture: payload.picture,
        permissions: 'STUDENT',
        uuid: v4(),
      })
      newUser.save().catch((err) => { console.log(err) })
    }
    verify().catch(console.error);
    return newUser;
  },

  async createCourse(parent, args, context, info) {
    const user = await verifyUser(context);
    if (user.permissions !== 'STUDENT') {
      const userInDb = await User.findById(user._id);
      const shortuid = new ShortUniqueId();
      const newCourse = new Course({
        enrollId: await shortuid.randomUUID(8),
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
    if (currentUser.permissions !== 'STUDENT') {
      const shortuid = new ShortUniqueId();
      const newClass = new Class({
        owner: currentUser._id,
        enrollId: await shortuid.randomUUID(8),
        ...args //spread incomming data from form
      })
      const createdClass = await newClass.save().catch((err) => { console.error(err) });
      return createdClass;
    }
    return 'Cannot create as student!';
  },

  async createPlaylist(parent, args, context, info) {
    const user = await verifyUser(context);
    if (user.permissions !== 'STUDENT') {
      const userInDb = await User.findById(user._id);
      const newPlaylist = new Playlist({
        courses: [args.courses],
        ...args //spread incomming data from form
      })
      const createdPlaylist = await newPlaylist.save().catch((err) => { console.error(err) });
      if (!userInDb.instructingPlaylists.includes(createdPlaylist._id)) {
        userInDb.instructingPlaylists.push(createdPlaylist._id);
        await userInDb.save()
      }
      return createdPlaylist;
    }
    return 'Permission Denied!';
  },

  async createObjective(parent, args, context, info) {
    const user = await verifyUser(context);
    if (user.permissions !== 'STUDENT') {
      const newObjective = new Objective({
        ...args //spread incomming data from form
      })
      const createdObjective = await newObjective.save().catch((err) => { console.error(err) });
      return createdObjective;
    }
    return 'Permission Denied!';
  },

  async enroll(parent, args, context, info) {
    const user = await verifyUser(context);
    if (user && user.permissions === 'SUPER_ADMIN') {
      const userInDb = await User.findById(user._id);
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