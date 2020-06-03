import React from 'react';
import PageTitle from '../../../components/PageTitle';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks'

import PagePadding from '../../../components/styled/PagePadding';
import ProgressTable_Courses from '../../../components/progress/ProgressTable_Courses';
import { GET_INSTRUCTING_STUDENTS_QUERY } from '../../../gql/queries';

const teacherStudents = () => {
  const { loading: loadingStudents, error: errorStudents, data: dataStudents } = useQuery(GET_INSTRUCTING_STUDENTS_QUERY);

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