import gql from 'graphql-tag';

export const GET_INSTRUCTING_COURSES = gql`
  query GET_INSTRUCTING_COURSES {
    getInstructingCourses {
      _id
      name
      subject
      description
      owner
      essentialPlaylists {
        _id
        name
        type
      }
      corePlaylists {
        _id
        name
        type
      }
      challengePlaylists {
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

export const GET_ENROLLED_CLASSES = gql`
query GET_ENROLLED_CLASSES {
  getEnrolledClasses {
    name
    _id
  }
}
`;

export const GET_INSTRUCTING_STUDENTS = gql`
  query GET_INSTRUCTING_STUDENTS {
    getInstructingStudents {
      _id
      name
      email
    }
  }
`;

export const GET_PLAYLIST = gql`
  query GET_PLAYLIST(
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