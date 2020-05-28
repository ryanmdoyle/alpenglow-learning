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
        order
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