const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4 } = require('uuid');

require('dotenv').config();

// Initialize mongo database
const db = require('./db');
const User = require('./models/User');

const typeDefs = require('./gqlSchema');
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
app.use(cors({ origin: process.env.FRONTEND_URL }));

//// TEST FOR BACKEND ////
// const { OAuth2Client } = require('google-auth-library');
// const client = new OAuth2Client('740708519996-jckm5svthu1lh5fv35jc55pp54kam9br');

const login = require('./controllers/login');
app.post('/auth/google', login)
///////////////////
///////////////////

server.applyMiddleware({
  app,
  path: '/gql',
});

app.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
})