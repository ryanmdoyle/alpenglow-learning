import { gql } from '@apollo/client';

export const GET_INSTRUCTING_COURSES = gql`
  query GET_INSTRUCTING_COURSES {
    getClassesInstructing {
      _id
      course {
        _id
      }
      name
      enrollId
      enrolled {
        _id
      }
    }
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
    getUsersInstructing {
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

export const GET_STUDENT_REQS_AND_PENDING_SCORES = gql`
  query GET_STUDENT_REQS_AND_PENDING_SCORES {
    getRequests {
      _id
      approved
      approvalAccepted
      type
      user {
        _id
        name
      }
      playlist {
        _id
        name
      }
    }
    getScoresPending {
      _id
      user {
        _id
        name
      }
      playlist {
        _id
        name
      }
      score
      possibleScore
    }
    getScoresInstructing {
      _id
      score
      possibleScore
      timeScored
      scoredBy
      user {
        _id
        name
      }
      playlist {
        _id
        name
      }
    }
  }
`;

export const GET_COURSE_DETAILS = gql`
query GET_COURSE_DETAILS($courseId: ID!) {
  getCourse(courseId: $courseId) {
    name
    subject
    grade
    section
    description
    startDate
    endDate
  }
}
`;