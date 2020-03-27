const User = require('../models/User');
const { v4 } = require('uuid');

const login = (req, res) => {
  const { OAuth2Client } = require('google-auth-library');
  const client = new OAuth2Client('740708519996-jckm5svthu1lh5fv35jc55pp54kam9br');

  const token = req.body.tokenId;
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
  res.send("message from the backend when done!")
}

module.exports = login;