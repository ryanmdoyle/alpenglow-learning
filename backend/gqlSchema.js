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
    getPlaylist(playlistId: ID): Playlist!,
    getEnrolledCourses(user_id: ID): [Course],
    getInstructingCourses(user_id: ID): [Course],
    getEnrolledClasses(user_id: ID): [Class],
    getInstructingClasses(user_id: ID): [Class],
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
      grade: Int,
      description: String,
      course: String!,
      type: String!,
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
    _id: ID,
    name: String!,
    firstName: String!,
    lastName: String!,
    picture: String,
    googleId: String!,
    email: String!,
    roles: [String!],
    enrolledCourses: [String],
    instructingCourses: [Course],
    instructingClasses: [Class],
  }

  type Course {
    _id: ID,
    name: String!,
    owner: String!,
    subject: String!,
    section: String,
    grade: Int!,
    description: String,
    startDate: Date,
    endDate: Date,
    playlists: [ Playlist ],
    classes: [ Class ],
  }

  type Class {
    _id: ID,
    name: String!,
    enrollId: String,
    course: Course!,
    primaryInstructor: String!,
    secondaryInstructors: [User],
    enrolled: [User],
  }

  type Playlist {
    _id: ID,
    name: String,
    subject: String,
    description: String,
    grade: Int,
    type: String,
    order: Int,
    course: String,
    objectives: [ Objective ],
  }

  type Objective {
    _id: ID,
    name: String!,
    description: String,
    subject: String,
    grade: Int,
    playlist: Playlist,
    order: Int,
  }
`;

module.exports = typeDefs;