const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date
  
  # # # # # # # # # # # #
  # QUERIES
  # # # # # # # # # # # #
  type Query {
    getCurrentUser: User,
    getUser(userId: ID): User!,
    getAllUsers: [User]!,
    getCourse(courseId: ID): Course,

    getPlaylist(playlistId: ID): Playlist!,
    getPlaylistRequest(playlistId: ID): Request,
    getRequests: [Request],
    
    getEnrolledCourses(userId: ID): [Course],
    getEnrolledClasses(userId: ID): [Class],
    getEnrolledPlaylists(userId: ID): [Playlist],
    
    getInstructingStudents: [User],
    getInstructingCourse(userId: ID!): Course,
    getInstructingCourses(userId: ID): [Course],
    getInstructingClass(classId: ID!): Class,
    getInstructingClasses(userId: ID): [Class],
    getInstructingPlaylists(userId: ID): [Playlist],
    getInstructingScores(userId: ID): [Score],

    getScores(userId: ID): [Score],
    getScoresPending: [Score],
    getScoresForPlaylist(playlistId: ID!): [Score],

    getQuizForPlaylist(playlistId: ID!): Quiz,
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

    createQuiz(
      playlistId: ID!,
      type: String!,
      externalLink: String!,
    ): Quiz,

    createScore(
      playlistId: ID!
    ): Score,

    enroll(enrollId: String!) : Class!,
    removeEnrollment(
      studentId: ID!,
      classId: ID!,
    ): Class,

    createRequest(playlistId: ID!) : Request!,
    approveRequest(requestId: ID!): Request!,
    cancelRequest(requestId: ID!): Request!
    deleteRequest(requestId: ID!): ID!,

    updateResourceOrder(
      objectiveId: String!,
      source: Int!,
      destination: Int!, 
    ): Objective!,

    updateObjectiveOrder(
      playlistId: String!,
      source: Int!,
      destination: Int!,
    ): Playlist!,

    updatePlaylistOrder(
      courseId: String!,
      playlistType: String!,
      source: Int!,
      destination: Int!,
    ): Course!,

    updatePlaylistDescription(
      playlistId: String!,
      description: String!,
    ): Playlist!,

    updateObjective(
      name: String!,
      objectiveId: String!,
      description: String!,
    ): Objective!,

    updateCourse(
      courseId: ID!,
      name: String!,
      subject: String!,
      grade: Int!,
      section: String,
      description: String,
      startDate: String,
      endDate: String,
    ): Course!,

    updatePlaylist(
      playlistId: ID!,
      name: String!,
      description: String!,
      type: String!,
    ): Playlist!,

    updateResource(
      resourceId: ID!,
      name: String!,
      description: String!,
      type: String!,
      href: String!,
    ): Resource!,

    updateQuiz(
      playlistId: ID!,
      type: String!,
      externalLink: String!,
    ): Quiz,

    updateScore(
      scoreId: ID!,
      score: Int!,
      possibleScore: Int!,
    ): Score!,

    deletePlaylist(
      playlistId: String!,
    ): Playlist!,

    deleteResource(
      resourceId: ID!,
    ): Resource!, 

    deleteObjective(
      objectiveId: ID!,
    ): Objective!,

    deleteCourse(
      courseId: ID!,
    ): Course!,

    acceptQuizApproval(requestId: ID!): Request!,
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
    essentialPlaylists: [ Playlist ],
    corePlaylists: [ Playlist ],
    challengePlaylists: [ Playlist ],
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
    playlist: ID!,
    questions: [Question],
    type: String!,
    externalLink: String!,
  }

  type Score {
    _id: ID,
    playlist: Playlist,
    user: User,
    possibleScore: Int,
    score: Int,
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
    playlist: Playlist,
    approved: Boolean,
    approvalAccepted: Boolean,
  }
`;


module.exports = typeDefs;