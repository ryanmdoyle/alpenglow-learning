const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date
  
  # # # # # # # # # # # #
  # QUERIES
  # # # # # # # # # # # #
  type Query {
    getCurrentUser: User,
    getUser(user_id: ID): User!,
    getAllUsers: [User]!,
    getEnrolledCourses(user_id: ID): [Course],
    getInstructingCourses(user_id: ID): [Course],
    getEnrolledPlaylists(user_id: ID): [Playlist],
    getInstructingPlaylists(user_id: ID): [Playlist],
  }

  # # # # # # # # # # # #
  # MUTATIONS
  # # # # # # # # # # # #
  type Mutation {
    # createUser: User!, currently used for creating account in rest API

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

    createClass(
      name: String!,
      course: String!,
      enrollId: [String],
      course: String,
      owner: String,
    ): Class!,

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
    ): Objective! ,

    enroll(
      enrollId: String!,
    ) : User!,
  }

  # # # # # # # # # # # #
  # CUSTOM TYPES
  # # # # # # # # # # # #

  type User {
    _id: String,
    name: String!,
    firstName: String!,
    lastName: String!,
    picture: String,
    googleId: String!,
    permissions: String!,
    email: String!,
    enrolledCourses: [String],
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

  type Class {
    name: String,
    course: Course,
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