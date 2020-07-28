import React, { useContext } from 'react';
import Head from 'next/head';

import TeacherWelcome from '../../components/welcome/TeacherWelcome';
import UserContext from '../../components/context/UserContext';

const teacherIndex = () => {
  const user = useContext(UserContext);
  return (
    <div>
      <Head>
        <title>Alpenglow Learning - Teacher Home</title>
        <meta name='description' content='Teacher welcome page and instructions.'></meta>
      </Head>
      <TeacherWelcome user={user} />
    </div>
  );
};

export default teacherIndex;