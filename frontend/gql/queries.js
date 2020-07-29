import gql from 'graphql-tag';

export const GET_INSTRUCTING_COURSES = gql`
  query GET_INSTRUCTING_COURSES {
    getCoursesInstructing {
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
  getClassesEnrolled {
    name
    _id
  }
}
`;

export const GET_INSTRUCTING_STUDENTS = gql`
  query GET_INSTRUCTING_STUDENTS {
    getStudentsInstructing {
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

export const GET_QUIZ_FOR_PLAYLIST = gql`
query GET_QUIZ_FOR_PLAYLIST($playlistId: ID!) {
  getQuizForPlaylist(playlistId: $playlistId) {
    _id
    externalLink
    externalResponsesLink
    possibleScore
    type
  }
}
`;

export const GET_INSTRUCTING_CLASSES = gql`
  query GET_INSTRUCTING_CLASSES {
    getClassesInstructing {
      _id
      enrolled {
        _id
      }
    }
  }
`;

export const GET_STUDENT_CLASS = gql`
query GET_STUDENT_CLASS($classId: ID!) {
  getClass(classId: $classId) {
    _id
    name
  }
  getTasks(classId: $classId) {
    _id
    description
    type
  }
}
`;

export const GET_ENROLLED_COURSES = gql`
query GET_ENROLLED_COURSES {
  getCoursesEnrolled {
    _id
    name
    subject
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
  }
  getScores {
    score
    possibleScore
    _id
    playlist {
      _id
      name
    }
  }
}
`;