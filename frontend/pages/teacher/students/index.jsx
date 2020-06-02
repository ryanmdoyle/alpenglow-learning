import React from 'react';
import PageTitle from '../../../components/PageTitle';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks'

import PagePadding from '../../../components/styled/PagePadding';
import ProgressBar from '../../../components/progress/ProgressBar';

const teacherStudents = () => {

  return (
    <>
      <PageTitle>Student Progress</PageTitle>
      <PagePadding>
        <p>A list of students will be here someday...</p>
        <ProgressBar
          totalPlaylists={30}
          totalAttempts={28}
          completeAttempts={18}
          partialAttempts={7}
          lowAttempts={3}
        />
      </PagePadding>
    </ >
  );
};

export default teacherStudents;