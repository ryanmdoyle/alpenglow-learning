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
    currentUser: User,
    user(_id: ID!): User,
    users: [User],
  }

  type Mutation {
    createUser: User,
    login(_id: ID!): User,
    sendCookie: User,
  }
`;

module.exports = typeDefs;