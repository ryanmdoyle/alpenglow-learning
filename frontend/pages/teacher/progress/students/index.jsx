import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks'

import PageTitle from '../../../../components/PageTitle';
import PagePadding from '../../../../components/styled/PagePadding';
import ProgressTable_Courses from '../../../../components/progress/ProgressTable_Courses';
// import { GET_INSTRUCTING_STUDENTS_QUERY } from '../../../../gql/queries';

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
  // const { loading: studentsLoading, error: studentsError, data: studentsData } = useQuery(GET_INSTRUCTING_STUDENTS_QUERY);
  const { loading, error, data } = useQuery(STUDENT_PROGRESS_QUERY);

  console.log(data)
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