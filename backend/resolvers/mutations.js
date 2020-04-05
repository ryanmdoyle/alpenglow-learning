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
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = await ticket.getPayload();
      const userid = await payload['sub'];
      // If request specified a G Suite domain:
      //const domain = payload['hd'];

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
      newUser.save().then(() => { console.log('User saved!') }).catch((err) => { console.log(err) })

    }
    verify().catch(console.error);
    return newUser;
  },

  async createCourse(parent, args, context, info) {
    console.log(args);
  }
}

module.exports = mutations;