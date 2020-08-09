import React, { useContext } from 'react';
import Head from 'next/head';

import PageFade from '../../components/styled/blocks/PageFade';
import EnrollForm from '../../components/forms/EnrollForm';
import PageTitle from '../../components/styled/PageTitle';

const enroll = () => {
  return (
    <PageFade>
      <Head>
        <title>Alpenglow Learning - Enroll in Course</title>
        <meta name='description' content='Course/Class enrollment page'></meta>
      </Head>
      <PageTitle>Add A New Class!</PageTitle>
      <EnrollForm />
    </PageFade>
  );
};

export default enroll;