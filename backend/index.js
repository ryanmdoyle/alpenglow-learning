require('dotenv').config();
require('./db');
const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const cors = require('cors');

const typeDefs = require('./gqlSchema');
const queries = require('./resolvers/queries');
const mutations = require('./resolvers/mutations');
const dateScalar = require('./resolvers/dateScaler');
const Auth = require('./lib/Auth');
const User = require('./models/User');

const resolvers = {
  Mutation: mutations,
  Query: queries,
  Date: dateScalar,
}

const app = express();

const origins = (process.env.NODE_ENV === 'production') ? [`https://${process.env.FRONTEND_URL}`, `https://www.${process.env.FRONTEND_URL}`] : 'http://localhost:3000'

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

// middleware to check/refresh tokens
app.use(async (req, res, next) => {
  const { ALPS_AT, ALPS_RT } = req.cookies;
  try {
    // try to verify auth token
    const tokenData = jwt.verify(ALPS_AT, process.env.AUTH_SECRET);
    req.currentUser = tokenData;
  } catch {
    // if auth token invalid, try to refresh using ref token
    try {
      const refreshData = jwt.verify(ALPS_RT, process.env.REF_SECRET);
      const userInDb = await User.findById(refreshData._id)
      const newAuthToken = Auth.createAuthToken(userInDb);
      const newRefreshToken = Auth.createRefreshToken(userInDb);
      res.cookie('ALPS_AT', newAuthToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 900000), // 1000ms * 60s * 15m
      });
      res.cookie('ALPS_RT', newRefreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 604800000), // 1000 * 60 * 60 * 24 * 7
      });
      req.currentUser = userInDb;
    } catch (err) {
      req.currentUser = null;
    }
  }
  next();
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return { ...req }
  },
  introspection: true,
  playground: true,
});

server.applyMiddleware({
  app,
  path: '/graphql',
  cors: false,
});

app.listen({ port: process.env.PORT || 4000 }, (res) => {
  console.log(`🚀 Server ready at ${process.env.PORT ? process.env.PORT : 'http://localhost:4000'}${server.graphqlPath}`);
});