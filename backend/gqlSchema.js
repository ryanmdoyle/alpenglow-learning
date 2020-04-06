const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  type Query {
    currentUser: User,
    user(_id: ID): User!,
    users: [User]!,
  }

  type Mutation {
    createUser: User!,
    createCourse(
      name: String!,
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
    ): Playlist!
  }

  type User {
    name: String!,
    firstName: String!,
    lastName: String!,
    picture: String,
    googleId: String!,
    permissions: String!,
    email: String!,
  }

  type Course {
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
    name: String,
    subject: String,
    description: String,
    grade: Int,
    objectives: [ Objective ],
    courses: [ Course ],
  }

  type Objective {
    name: String,
    description: String,
    subject: String,
    grade: Int,
    playlists: [ Playlist ],
    courses: [Course ],
  }
`;

module.exports = typeDefs;