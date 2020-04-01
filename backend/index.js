const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const db = require('./db');
const User = require('./models/User');

const typeDefs = require('./gqlSchema');
const queries = require('./resolvers/queries');
const mutations = require('./resolvers/mutations');

const resolvers = {
  Mutation: mutations,
  Query: queries,
}

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.post('/graphql', (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const tokenData = jwt.verify(token, process.env.SECRET);
    req._id = tokenData._id;
  }
  next();
})

//// TEMP REST LOGIN ////
const login = require('./controllers/login');
app.post('/auth/google', login);
///////////////////

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => ({
    ...req,
    userId: req._id,
  })
});

server.applyMiddleware({
  app,
  path: '/graphql',
  cors: false,
});

app.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
})