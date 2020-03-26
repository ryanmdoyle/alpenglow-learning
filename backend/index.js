const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();


// const typeDefs = require('./schema');
// const queries = require('./resolvers/queries');
// const mutations = require('./resolvers/mutations');
// const resolvers = { queries, mutations };

const users = require('./SAMPLEDATA.js');

const typeDefs = gql`
  type User {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    permissions: String,
  }

  type Query {
    user: User,
    users: [User],
  }

  type Mutation {
    user: User,
  }
`;

const resolvers = {
  Mutation: {
    user: () => users
  },
  Query: {
    user: () => users,
    users: () => users
  }
}

const db = mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: req => ({ ...req, db }), // add the mongoose db connection to all requests
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  req = {db, ...db},
  next();
})

var corsOptions = {
  origin: 'http://localhost:3000', //process.env.FRONTEND_URL
  // credentials: false // <-- REQUIRED backend setting
};

app.use(cors(corsOptions));

app.get('/get', (req, res) => {
  // console.log(req)
  res.send("hello")
})


////////////////////////
////////////////////////
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
    console.log("GOD IT WORKS!")
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
  console.log(users);
})