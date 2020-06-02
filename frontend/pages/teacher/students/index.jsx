import React from 'react';
import PageTitle from '../../../components/PageTitle';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks'

import PagePadding from '../../../components/styled/PagePadding';
import ProgressBar from '../../../components/progress/ProgressBar';
import ProgressTable_Courses from '../../../components/progress/ProgressTable_Courses';

const teacherStudents = () => {

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