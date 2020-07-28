import React, { useContext } from 'react';
import Head from 'next/head';

import EnrollForm from '../../components/forms/EnrollForm';
import PageTitle from '../../components/styled/PageTitle';

const enroll = () => {
  return (
    <div>
      <Head>
        <title>Alpenglow Learning - Enroll in Course</title>
        <meta name='description' content='Course/Class enrollment page'></meta>
      </Head>
      <PageTitle>Add A New Class!</PageTitle>
      <EnrollForm />
    </div>
  );
};

export default enroll;