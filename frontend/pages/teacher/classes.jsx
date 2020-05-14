import React from 'react';
import PageTitle from '../../components/PageTitle';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks'

import Loading from '../../components/Loading';
import PagePadding from '../../components/styled/PagePadding';
import CreateClass from '../../components/CreateClass';

const INSTRUCTING_COURSES_QUERY = gql`
  query INSTRUCTING_COURSES_QUERY {
    getInstructingCourses {
      _id
      name
    }
  }
`;
// On  this page, show a list of courses, with a button after to add a "class"
const teacherClasses = () => {
  const { loading, error, data } = useQuery(INSTRUCTING_COURSES_QUERY);

  if (error) return null;
  if (loading) return <Loading />
  return (
    <div>
      <PageTitle title='Your Classes' />
      <PagePadding>
        {data.getInstructingCourses && data.getInstructingCourses.map(course => (
          <h4 key={course._id}>{course.name}</h4>
        ))}
        <h3>Create Class</h3>
        <CreateClass />

      </PagePadding>
    </div>
  );
};

export default teacherClasses;