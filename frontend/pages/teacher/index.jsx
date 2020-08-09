import React, { useContext } from 'react';
import Head from 'next/head';

import PageFade from '../../components/styled/blocks/PageFade';
import TeacherWelcome from '../../components/welcome/TeacherWelcome';
import UserContext from '../../components/context/UserContext';

const teacherIndex = () => {
  const user = useContext(UserContext);
  return (
    <PageFade>
      <Head>
        <title>Alpenglow Learning - Teacher Home</title>
        <meta name='description' content='Teacher welcome page and instructions.'></meta>
      </Head>
      <TeacherWelcome user={user} />
    </PageFade>
  );
};

export default teacherIndex;