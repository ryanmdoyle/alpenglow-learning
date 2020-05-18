import React from 'react';
import PageTitle from '../../../components/PageTitle';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks'

import PagePadding from '../../../components/styled/PagePadding';

const teacherStudents = () => {

  return (
    <>
      <PageTitle title='Student Progress' />
      <PagePadding>
        <p>A list of students will be here someday...</p>
      </PagePadding>
    </ >
  );
};

export default teacherStudents;