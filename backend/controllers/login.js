const User = require('../models/User');
const { v4 } = require('uuid');

const login = async (req, res) => {
  const { OAuth2Client } = await require('google-auth-library');
  const client = await new OAuth2Client('740708519996-jckm5svthu1lh5fv35jc55pp54kam9br');

  const token = await req.body.tokenId;

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
    newUser.save().then(() => { console.log('saved user') }).catch((err) => { console.log('error in login save', err) })

  }
  await verify().catch(console.error);
  // customize token later
  // await res.cookie('LOGIN', 'something', { // all this does is set the header, you have to still send response
  //   httpOnly: true,
  // });
  res.set('Set-Cookie', 'testcookiewithressend="12345"; HttpOnly; Max-Age=6000000; SameSite=None;');
  res.send("hiya");
}

module.exports = login;