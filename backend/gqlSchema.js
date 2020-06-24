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
    getPlaylistRequest(playlistId: ID): Request,
    getStudentRequests: [Request],
    
    getEnrolledCourses(user_id: ID): [Course],
    getEnrolledClasses(user_id: ID): [Class],
    getEnrolledPlaylists(user_id: ID): [Playlist],
    
    getInstructingStudents: [User],
    getInstructingCourse(user_id: ID!): Course,
    getInstructingCourses(user_id: ID): [Course],
    getInstructingClasses(user_id: ID): [Class],
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
      playlist: String,
    ): Objective! ,

    createResource(
      name: String!,
      description: String!,
      href: String!,
      type: String!,
      objective: String!
    ) : Resource!,

    enroll(enrollId: String!) : User!,

    createRequest(playlistId: ID!) : Request!,
    approveRequest(playlistId: ID!): Request!,
    cancelRequest(playlistId: ID!): Request!
    deleteRequest(playlistId: ID!): ID!,

    updateResourceOrder(
      objectiveId: String!,
      source: Int!,
      destination: Int!, 
    ): Objective!,

    updateObjectiveOrder(
      playlistId: String!,
      source: Int!,
      destination: Int!,
    ): Playlist!
  }

  # # # # # # # # # # # #
  # SUBSCRIPTIONS
  # # # # # # # # # # # #

  type Subscription {
    requestApproved(userId: ID!): Request,
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
    course: String!,
    primaryInstructor: User!,
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
    course: String,
    objectives: [ Objective ],
  }

  type Objective {
    _id: ID,
    name: String!,
    description: String,
    playlist: String,
    resources: [ Resource ],
  }

  type Resource {
    _id: ID,
    name: String,
    description: String,
    href: String,
    order: Int,
    objective: String,
    type: String,
  }

  type Quiz {
    _id: ID,
    playlist: String,
    user: User,
    score: String,
    questions: [ String ],
  }

  type Score {
    _id: ID,
    user: User,
    possibleScore: Int,
    score: Int,
    playlist: String,
  }

  type Question {
    _id: ID,
    objective: String,
    text: String,
    responses: [String], 
  }

  type Request {
    _id: ID,
    user: User,
    playlist: String,
    approved: Boolean,
    approvalAccepted: Boolean,
  }
`;


module.exports = typeDefs;