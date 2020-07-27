require('dotenv').config();
require('./db');
const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');

const typeDefs = require('./gqlSchema');
const queries = require('./resolvers/queries');
const mutations = require('./resolvers/mutations');
const subscriptions = require('./resolvers/subscriptions');
const dateScalar = require('./resolvers/dateScaler');

const resolvers = {
  Mutation: mutations,
  Query: queries,
  Date: dateScalar,
  Subscription: subscriptions,
}

const app = express();

const origins = (process.env.NODE_ENV === 'production') ? [`https://${process.env.FRONTEND_URL}`, `https://www.${process.env.FRONTEND_URL}`] : 'http://localhost:3000'

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, connection }) => {
    if (connection) return connection.context;
    const { token } = req.cookies;
    if (token) {
      const tokenData = jwt.verify(token, process.env.SECRET);
      req.currentUser = tokenData;
    } else {
      req.currentUser = null;
    }
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