const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4 } = require('uuid');

require('dotenv').config();

// Initialize mongo database
const db = require('./db');
const User = require('./models/User');

const typeDefs = require('./schema');
const queries = require('./resolvers/queries');
const mutations = require('./resolvers/mutations');

const resolvers = {
  Mutation: mutations,
  Query: queries,
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: req => ({ ...req, db }), // add the mongoose db connection to all requests
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var corsOptions = {
  origin: 'http://localhost:3000', //process.env.FRONTEND_URL
};

app.use(cors(corsOptions));

app.get('/get', (req, res) => {
  // console.log(req)
  res.send("hello")
})

//// TEST FOR BACKEND ////
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('740708519996-jckm5svthu1lh5fv35jc55pp54kam9br');

app.post('/auth/google', (req, res) => {


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
      googleId: payload.sub,
      picture: payload.picture,
      permissions: 'User',
      uuid: v4(),
    })
    newUser.save().then(() => { console.log('User saved!') }).catch((err) => { console.log(err) })

  }
  verify().catch(console.error);


  res.send("message from the backend when done!")
})

///////////////////
///////////////////
server.applyMiddleware({
  app,
  path: '/gql',
});

app.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
})