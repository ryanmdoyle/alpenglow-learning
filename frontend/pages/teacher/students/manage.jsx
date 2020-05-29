import React from 'react';
import PageTitle from '../../../components/PageTitle';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks'

import PagePadding from '../../../components/styled/PagePadding';

const GET_INSTRUCTING_STUDENTS_QUERY = gql`
  query GET_INSTRUCTING_STUDENTS_QUERY {
    getInstructingStudents {
      _id
      name
    }
  }
`;

const manage = () => {
  const { loading, error, data } = useQuery(GET_INSTRUCTING_STUDENTS_QUERY);
  console.log(data);
  return (
    <>
      <PageTitle>Manage Students</PageTitle>
      <PagePadding>

        <p>Manage all students here (emails, parents data, etc.)</p>
      </PagePadding>
    </>
  );
};

export default manage;