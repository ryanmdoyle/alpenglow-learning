import React from 'react';
import PageTitle from '../../components/PageTitle';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks'

import Loading from '../../components/Loading';
import PagePadding from '../../components/styled/PagePadding';

const TEACHER_COURSES_QUERY = gql`
  query TEACHER_COURSES_QUERY {
    getTeachingCourses {
      _id
      name
    }
  }
`;

const teacherCourses = () => {
  const { loading, error, data } = useQuery(TEACHER_COURSES_QUERY);

  if (loading) return <Loading />;
  return (
    <div>
      <PageTitle title='Courses You Teach' />
      <PagePadding>
        {data.getTeachingCourses && (
          data.getTeachingCourses.map(course => (
            <>
              <h3>{course.name}</h3>
              <p>CLASS HERE</p>
            </>
          ))
        )}
      </PagePadding>
    </div>
  );
};

export default teacherCourses;