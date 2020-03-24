const { ApolloServer, gql } = require('apollo-server-express');

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
`;