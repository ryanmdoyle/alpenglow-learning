import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import PageFade from '../../../../components/styled/blocks/PageFade';
import PageTitle from '../../../../components/styled/PageTitle';
import CreateContentNav from '../../../../components/Nav/CreateContentNav';
import CreatePlaylistForm from '../../../../components/forms/create/CreatePlaylistForm';
import CreateCourseForm from '../../../../components/forms/create/CreateCourseForm';
import CreateObjectiveForm from '../../../../components/forms/create/CreateObjectiveForm';

const createContent = () => {
  const router = useRouter();
  const [activeForm, setActiveForm] = useState('course');

  const changeForm = (courseString) => {
    setActiveForm(courseString);
  }
  return (
    <PageFade>
      <Head>
        <title>Alpenglow Learning - Quick Add</title>
        <meta name='description' content='Quick Add Content'></meta>
      </Head>
      <PageTitle>Create New Content</PageTitle>
      <CreateContentNav changeForm={changeForm} currentForm={activeForm} />
      {(activeForm === 'objective') && <CreateObjectiveForm />}
      {(activeForm === 'playlist') && <CreatePlaylistForm />}
      {(activeForm === 'course') && <CreateCourseForm />}
      {/* {(activeForm === 'question') && <CreateQuestionForm />} */}
    </PageFade>
  );
};

export default createContent;