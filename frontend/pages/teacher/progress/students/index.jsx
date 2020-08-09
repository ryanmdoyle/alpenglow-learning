import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

import PageFade from '../../../../components/styled/blocks/PageFade';
import PageTitle from '../../../../components/styled/PageTitle';
import PagePadding from '../../../../components/styled/blocks/PagePadding';
import ProgressCoursesTable from '../../../../components/progress/ProgressCoursesTable';

const teacherStudents = () => {
  return (
    <PageFade>
      <Head>
        <title>Alpenglow Learning - All Students Progress</title>
        <meta name='description' content='Progress for all enrolled students.'></meta>
      </Head>
      <PageTitle>Student Progress</PageTitle>
      <PagePadding>
        <ProgressCoursesTable />
      </PagePadding>
    </PageFade>
  );
};

export default teacherStudents;