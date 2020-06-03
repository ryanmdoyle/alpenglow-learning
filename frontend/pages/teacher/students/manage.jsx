import React from 'react';
import PageTitle from '../../../components/PageTitle';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks'

import PagePadding from '../../../components/styled/PagePadding';
import Loading from '../../../components/Loading';
import { TextTableContainer, TextTableHeader, TextTableRow } from '../../../components/styled/tables/TextTable';
import { GET_INSTRUCTING_STUDENTS_QUERY } from '../../../gql/queries';

const manage = () => {
  const { loading, error, data } = useQuery(GET_INSTRUCTING_STUDENTS_QUERY);

  if (loading) return <Loading />;
  return (
    <>
      <PageTitle>Manage Students</PageTitle>
      <PagePadding>
        <h4>All Students Enrolled in Classes</h4>
        <TextTableContainer>
          <TextTableHeader>
            <span>Name</span>
            <span>Email</span>
            <span>Enrolled Classes</span>
          </TextTableHeader>
          {data.getInstructingStudents.map(student => (
            <TextTableRow>
              <span>{student.name}</span>
              <span>{student.email}</span>
              <span>{student.enrolledClasses.length}</span>
            </TextTableRow>
          ))}
        </TextTableContainer>
      </PagePadding>
    </>
  );
};

export default manage;