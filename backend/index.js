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
const authorizeUser = require('./lib/authMiddleware');

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
app.use((req, res, next) => {
  const { ALPS_AT, ALPS_RT } = req.cookies;
  if (ALPS_AT || ALPS_RT) {
    try {
      if (!ALPS_AT) throw new Error;
      // try to validate token, if it's validated set user on req
      const tokenData = jwt.verify(ALPS_AT, process.env.AUTH_SECRET);
      req.currentUser = tokenData;
    } catch {
      // if token invalid, try to refresh using refresh token
      try {
        if (!ALPS_RT) throw new Error;
        const refresh = jwt.verify(ALPS_RT, process.env.REF_SECRET); // if invalid exits to catch block
        const verifiedUser = Auth.verifyUserInDb(refresh._id);
        const newAuthToken = Auth.createAuthToken(verifiedUser);
        const newRefreshToken = Auth.createRefreshToken(verifiedUser);
        res.cookie('ALPS_AT', newAuthToken, {
          httpOnly: true,
          expires: new Date(Date.now() + 900000), // 1000 * 60 * 15
        });
        res.cookie('ALPS_RT', newRefreshToken, {
          httpOnly: true,
          expires: new Date(Date.now() + 604800000), // 1000 * 60 * 60 * 24 * 7
        });
        req.currentUser = refresh;
      } catch {
        req.currentUser = null;
      }
    }
  } else {
    req.currentUser = null;
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