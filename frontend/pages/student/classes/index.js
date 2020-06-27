import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks'

import PageTitle from '../../../components/PageTitle';
import Loading from '../../../components/Loading';
import CourseTimelines from '../../../components/courses/CourseTimelines';

const ENROLLED_COURSES_QUERY = gql`
  query ENROLLED_COURSES_QUERY {
    getEnrolledCourses {
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
  }
`;

const studentClasses = () => {
  const { loading, error, data } = useQuery(ENROLLED_COURSES_QUERY);
  if (error) return null;
  if (loading) return <Loading />;
  return (
    <div>
      <PageTitle>All Classes</PageTitle>
      {data.getEnrolledCourses && (
        data.getEnrolledCourses.map(course => {
          if (course.essentialPlaylists.length > 0 || course.corePlaylists.length) {
            return (
              <CourseTimelines
                name={course.name}
                courseId={course._id}
                essentialPlaylists={course.essentialPlaylists}
                corePlaylists={course.corePlaylists}
                challengePlaylists={course.challengePlaylists}
                subject={course.subject}
                key={course._id}
              />
            )
          }
        })
      )}
    </div >
  );
};

export default studentClasses;