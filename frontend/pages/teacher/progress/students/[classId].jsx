import React from 'react';
import Head from 'next/head';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import PageTitle from '../../../../components/styled/PageTitle';
import PagePadding from '../../../../components/styled/PagePadding';
import ClassProgressTable from '../../../../components/progress/classProgress/ClassProgressTable';

const GET_CLASS_TITLE = gql`
  query GET_CLASS_TITLE($classId: ID!) {
    getClassInstructing(classId: $classId) {
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
  const name = data?.getClassInstructing?.name;
  const title = name ? `Class Progress - ${name}` : `Class Progress`
  return (
    <div>
      <Head>
        <title>Alpenglow Learning - Class Progress for {name}</title>
        <meta name='description' content={`Class Progress for ${name}`}></meta>
      </Head>
      <PageTitle>{title}</PageTitle>
      <PagePadding>
        <ClassProgressTable />
      </PagePadding>
    </div>
  );
};

export default classProgress;