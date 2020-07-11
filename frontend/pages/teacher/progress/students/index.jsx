import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks'

import PageTitle from '../../../../components/PageTitle';
import PagePadding from '../../../../components/styled/blocks/PagePadding';
import ProgressTable_Courses from '../../../../components/progress/ProgressTable_Courses';

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