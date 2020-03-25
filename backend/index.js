const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: req => ({ ...req }),
});

const app = express();

var corsOptions = {
  origin: 'http://localhost:3000', //process.env.FRONTEND_URL
  // credentials: false // <-- REQUIRED backend setting
};

app.use(cors(corsOptions));

app.get('/get', (req, res) => {
  console.log(req)
  res.send("hello")
})

server.applyMiddleware({
  app,
  path: '/gql',
});

app.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  console.log(users);
})