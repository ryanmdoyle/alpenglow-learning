import React from 'react';
import PageTitle from '../../components/PageTitle';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks'

import Loading from '../../components/Loading';
import PagePadding from '../../components/styled/PagePadding';
import CourseTimeline from '../../components/CourseTimeline';

const INSTRUCTING_COURSES_QUERY = gql`
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
    }
  }
`;

const teacherCourses = () => {
  const { loading, error, data } = useQuery(INSTRUCTING_COURSES_QUERY);

  if (loading) return <Loading />;

  return (
    <div>
      <PageTitle title='Courses You Teach' />
      {data.getInstructingCourses && (
        data.getInstructingCourses.map(course => (
          <CourseTimeline name={course.name} playlists={course.playlists} key={course._id} />
        ))
      )}
    </div >
  );
};

export default teacherCourses;
export { INSTRUCTING_COURSES_QUERY };