import React from 'react';
import Head from 'next/head';

import PageTitle from '../../../../components/styled/PageTitle';
import PagePadding from '../../../../components/styled/blocks/PagePadding';
import ProgressCoursesTable from '../../../../components/progress/ProgressCoursesTable';

const teacherStudents = () => {
  return (
    <>
      <Head>
        <title>Alpenglow Learning - All Students Progress</title>
        <meta name='description' content='Progress for all enrolled students.'></meta>
      </Head>
      <PageTitle>Student Progress</PageTitle>
      <PagePadding>
        <ProgressCoursesTable />
      </PagePadding>
    </>
  );
};

export default teacherStudents;