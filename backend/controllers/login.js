const User = require('../models/User');
// const { v4 } = require('uuid');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { OAuth2Client } = await require('google-auth-library');
  const client = await new OAuth2Client('740708519996-jckm5svthu1lh5fv35jc55pp54kam9br');
  const token = await req.headers.authorization;

  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '740708519996-jckm5svthu1lh5fv35jc55pp54kam9br.apps.googleusercontent.com',  // Specify the CLIENT_ID of the app that accesses the backend
    });

    const payload = await ticket.getPayload();

    const user = User.findOne({ googleId: payload.sub }, async (err, response) => {

      // If user already exists, authorize login
      if (response !== null) {
        const alpenglowToken = await jwt.sign({
          firstName: response.firstName,
          lastName: response.lastName,
          permissions: response.permissions,
          _id: response._id,
        }, process.env.SECRET)
        await res.set('Set-Cookie', `token=${alpenglowToken}; HttpOnly; Max-Age=6000000; SameSite=None; Path=/`);
        await res.set('Authorization', alpenglowToken);
        res.send(`Welcome ${user.firstName}!`);
      }

      // if user does not exists, add user to db and login
      if (response === null) {
        const newUser = new User({
          firstName: payload.given_name,
          lastName: payload.family_name,
          name: payload.name,
          email: payload.email,
          googleId: payload.sub,
          picture: payload.picture,
          permissions: 'User',
        })
        newUser
          .save()
          .then(async () => {

            const newUser = User.findOne({ googleId: payload.sub }, async (err, newUserRes) => {

              const alpenglowToken = await jwt.sign({
                firstName: newUserRes.firstName,
                lastName: newUserRes.lastName,
                permissions: newUserRes.permissions,
                _id: newUserRes._id,
              }, process.env.SECRET);

              await res.set('Set-Cookie', `token=${alpenglowToken}; HttpOnly; Max-Age=6000000; SameSite=None; Path=/`);
              await res.set('Authorization', alpenglowToken);
              res.send(`Welcome new user, ${payload.given_name}!`);

            })
          })
          .catch((err) => { console.error('error in user creation', err) })
      }
    })
  }
  await verify().catch(console.error);
}

module.exports = login;