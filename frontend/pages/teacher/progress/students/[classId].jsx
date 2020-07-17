import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

import PageTitle from '../../../../components/PageTitle';
import PagePadding from '../../../../components/styled/PagePadding';
import ClassProgressTable from '../../../../components/progress/classProgress/ClassProgressTable';

const GET_CLASS_TITLE = gql`
  query GET_CLASS_TITLE($classId: ID!) {
    getInstructingClass(classId: $classId) {
      _id
      name
    }
  }
`;

const classProgress = () => {
  const { query: { classId } } = useRouter();
  const { data } = useQuery(GET_CLASS_TITLE, {
    variables: { classId },
  })
  const name = data?.getInstructingClass?.name;
  return (
    <div>
      <PageTitle>Student Progress{name ? ` - ${name}` : null}</PageTitle>
      <PagePadding>
        <ClassProgressTable />
      </PagePadding>
    </div>
  );
};

export default classProgress;