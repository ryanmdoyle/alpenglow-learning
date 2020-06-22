import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks'

import PageTitle from '../../../components/PageTitle';
import Loading from '../../../components/Loading';
import CourseTimeline from '../../../components/courses/CourseTimeline';

const ENROLLED_COURSES_QUERY = gql`
  query ENROLLED_COURSES_QUERY {
    getEnrolledCourses {
      _id
      name
      subject
      playlists {
        _id
        name
        type
      }
    }
  }
`;

const studentClasses = () => {
  const { loading, error, data } = useQuery(ENROLLED_COURSES_QUERY);
  console.log(data);
  if (error) return null;
  if (loading) return <Loading />;
  return (
    <div>
      <PageTitle>All Classes</PageTitle>
      {data.getEnrolledCourses && (
        data.getEnrolledCourses.map(course => {
          if (course.playlists.length > 0) {
            return (
              <CourseTimeline
                name={course.name}
                courseId={course._id}
                playlists={course.playlists}
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