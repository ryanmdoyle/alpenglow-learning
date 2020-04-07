const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Course = require('../models/Course');
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
        permissions: 'User',
        uuid: v4(),
      })
      newUser.save().catch((err) => { console.log(err) })
    }
    verify().catch(console.error);
    return newUser;
  },

  async createCourse(parent, args, context, info) {
    const userToken = context.cookies.token;
    const user = await jwt.verify(userToken, process.env.SECRET);
    if (user.permissions !== 'Student') {
      const newCourse = new Course({
        ...args //spread incomming data from form
      })
      const createdCourse = await newCourse.save().catch((err) => { console.error(err) });
      return createdCourse;
    }
    return 'Permission Denied!';
  },

  async createPlaylist(parent, args, context, info) {
    const userToken = context.cookies.token;
    const user = jwt.verify(userToken, process.env.SECRET);
    if (user.permissions !== 'Student') {
      const newPlaylist = new Playlist({
        courses: [args.courses],
        ...args //spread incomming data from form
      })
      const createdPlaylist = await newPlaylist.save().catch((err) => { console.error(err) });
      return createdPlaylist;
    }
    return 'Permission Denied!';
  },

  async createObjective(parent, args, context, info) {
    const userToken = context.cookies.token;
    const user = jwt.verify(userToken, process.env.SECRET);
    if (user.permissions !== 'Student') {
      const newObjective = new Objective({
        ...args //spread incomming data from form
      })
      const createdObjective = await newObjective.save().catch((err) => { console.error(err) });
      return createdObjective;
    }
    return 'Permission Denied!';
  },
}
module.exports = mutations;