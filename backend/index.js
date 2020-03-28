const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
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
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  // exposedHeaders: 'Set-Cookie',
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//// TEMP REST LOGIN ////
const login = require('./controllers/login');
app.post('/auth/google', login)
app.post('/cookie', (req, res) => { // THIS WORKS
  res.set('Set-Cookie', 'testcookiewithressend="12345"; HttpOnly; Max-Age=6000000; SameSite=None;');
  res.send('cookie set!');
})
///////////////////

server.applyMiddleware({
  app,
  path: '/gql',
  // cors: false,
});

app.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
})