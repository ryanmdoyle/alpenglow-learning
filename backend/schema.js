const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    uuid: String,
    name: String,
    firstName: String,
    lastName: String,
    picture: String,
    googleId: String,
    permissions: String,
    email: String,
  }

  type Query {
    user: User,
    users: [User],
  }

  type Mutation {
    user: User,
  }
`;

module.exports = typeDefs;