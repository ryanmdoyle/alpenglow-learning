import React from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks'

import PageTitle from '../../../../components/PageTitle';
import PagePadding from '../../../../components/styled/blocks/PagePadding';
import Loading from '../../../../components/Loading';
import { ListContainer, ListRow } from '../../../../components/styled/blocks/List';
import { GET_INSTRUCTING_STUDENTS } from '../../../../gql/queries';

const studentList = () => {
  const { loading, error, data } = useQuery(GET_INSTRUCTING_STUDENTS);

  if (error) return null;
  if (loading) return <Loading />;
  return (
    <>
      <PageTitle>Manage Your Students</PageTitle>
      <PagePadding>
        <h4>All Students Enrolled in Classes</h4>
        <ListContainer>
          {data.getInstructingStudents.map(student => {
            const enrolled = '5';
            return (
              <ListRow>
                <span>{student.name}</span>
                <span>{student.email}</span>
                <span>{enrolled > 1 ? `${enrolled} classes` : `${enrolled} class`}</span>
              </ListRow>
            )
          })}
        </ListContainer>
      </PagePadding>
    </>
  );
};

export default studentList;