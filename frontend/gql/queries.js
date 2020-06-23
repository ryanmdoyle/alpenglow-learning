import { gql } from 'apollo-boost';

export const INSTRUCTING_COURSES_QUERY = gql`
  query INSTRUCTING_COURSES_QUERY {
    getInstructingCourses {
      _id
      name
      subject
      description
      playlists {
        _id
        name
        type
      }
      classes {
        _id
        name
        enrollId
        enrolled {
          _id
        }
      }
    }
  }
`;

export const GET_ENROLLED_COURSES_QUERY = gql`
query GET_ENROLLED_COURSES_QUERY {
  getEnrolledCourses {
    name
    _id
  }
}
`;

export const GET_ENROLLED_CLASSES_QUERY = gql`
query GET_ENROLLED_CLASSES_QUERY {
  getEnrolledClasses {
    name
    _id
  }
}
`;

export const GET_INSTRUCTING_STUDENTS_QUERY = gql`
  query GET_INSTRUCTING_STUDENTS_QUERY {
    getInstructingStudents {
      _id
      name
      email
    }
  }
`;

export const PLAYLIST_QUERY = gql`
  query PLAYLIST_QUERY(
    $playlistId: ID!
  ) {
    getPlaylist(playlistId: $playlistId) {
      _id
      name
      subject
      description
      objectives {
        _id
        name
        description
        resources {
          _id
          name
          href
          description
          type
        }
      }
      type
    }
  }
`;