import React, { useState } from 'react';
import { css } from '@emotion/core'

import PagePadding from '../components/styled/PagePadding';
import PageTitle from '../components/PageTitle';
import CreateContentNav from '../components/CreateContentNav';

import CreatePlaylist from '../components/CreatePlaylist';
import CreateCourse from '../components/CreateCourse';
import CreateObjective from '../components/CreateObjective';

const createContent = () => {
  const [activeForm, setActiveForm] = useState('course');

  const changeForm = (courseString) => {
    setActiveForm(courseString);
  }

  return (
    <div>
      <PageTitle title='Create New Content' />
      <CreateContentNav changeForm={changeForm} currentForm={activeForm} />
      {(activeForm === 'objective') && <CreateObjective />}
      {(activeForm === 'playlist') && <CreatePlaylist />}
      {(activeForm === 'course') && <CreateCourse />}
      {/* {(activeForm === 'question') && <CreateQuestion />} */}
    </div>
  );
};

export default createContent;