import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks'

import PageTitle from '../../../../components/PageTitle';
import PagePadding from '../../../../components/styled/blocks/PagePadding';
import ProgressTable_Courses from '../../../../components/progress/ProgressTable_Courses';
// import { GET_INSTRUCTING_STUDENTS } from '../../../../gql/queries';

const STUDENT_PROGRESS_QUERY = gql`
  query STUDENT_PROGRESS_QUERY {
    getInstructingCourses {
      _id
      name
    }
    getInstructingStudents {
      _id
      name
    }
  }
`;

const teacherStudents = () => {
  // const { loading: studentsLoading, error: studentsError, data: studentsData } = useQuery(GET_INSTRUCTING_STUDENTS);
  const { loading, error, data } = useQuery(STUDENT_PROGRESS_QUERY);

  return (
    <>
      <PageTitle>Student Progress</PageTitle>
      <PagePadding>
        <ProgressTable_Courses />
      </PagePadding>
    </ >
  );
};

export default teacherStudents;