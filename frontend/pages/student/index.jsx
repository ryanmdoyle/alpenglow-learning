import React, { useContext } from 'react';
import Head from 'next/head';

import PageFade from '../../components/styled/blocks/PageFade';
import StudentWelcome from '../../components/welcome/StudentWelcome';
import UserContext from '../../components/context/UserContext';

const studentIndex = () => {
  const user = useContext(UserContext);

  return (
    <PageFade>
      <Head>
        <title>Alpenglow Learning - Student Home</title>
        <meta name='description' content='Student welcome page and instructions.'></meta>
      </Head>
      <StudentWelcome user={user} />
    </PageFade>
  );
};

export default studentIndex;