import React, { useState } from 'react';
import { useRouter } from 'next/router';

import PageTitle from '../../../../components/styled/PageTitle';
import CreateContentNav from '../../../../components/CreateContentNav';
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
    <div>
      <PageTitle>Create New Content</PageTitle>
      <CreateContentNav changeForm={changeForm} currentForm={activeForm} />
      {(activeForm === 'objective') && <CreateObjectiveForm />}
      {(activeForm === 'playlist') && <CreatePlaylistForm />}
      {(activeForm === 'course') && <CreateCourseForm />}
      {/* {(activeForm === 'question') && <CreateQuestionForm />} */}
    </div>
  );
};

export default createContent;