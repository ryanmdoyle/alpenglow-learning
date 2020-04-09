const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  type Query {
    currentUser: User,
    user(_id: ID): User!,
    users: [User]!,
    getCourses: [Course],
  }

  type Mutation {
    createUser: User!,

    createCourse(
      name: String!,
      enrollId: String,
      subject: String!,
      grade: Int!,
      section: String,
      description: String,
      startDate: String,
      endDate: String,
    ): Course!,

    createPlaylist(
      name: String!,
      subject: String!,
      grade: Int!,
      description: String,
      courses: String,
    ): Playlist!,

    createObjective(
      _id: String,
      name: String!,
      description: String,
      subject: String,
      grade: Int,
    ): Objective! 
  }

  type User {
    _id: String,
    name: String!,
    firstName: String!,
    lastName: String!,
    picture: String,
    googleId: String!,
    permissions: String!,
    email: String!,
  }

  type Course {
    _id: String,
    name: String,
    section: String,
    subject: String,
    grade: Int,
    description: String,
    startDate: Date,
    endDate: Date,
    playlists: [Playlist],
  }

  type Playlist {
    _id: String,
    name: String,
    subject: String,
    description: String,
    grade: Int,
    objectives: [ Objective ],
    courses: [ Course ],
  }

  type Objective {
    _id: String,
    name: String!,
    description: String,
    subject: String,
    grade: Int,
    playlists: [ Playlist ],
  }
`;

module.exports = typeDefs;