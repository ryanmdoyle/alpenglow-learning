import React, { useState } from 'react';
import { useRouter } from 'next/router';

import PageTitle from '../../../components/PageTitle';
import CreateContentNav from '../../../components/CreateContentNav';

import CreatePlaylist from '../../../components/CreatePlaylist';
import CreateCourse from '../../../components/CreateCourse';
import CreateObjective from '../../../components/CreateObjective';
import { useEffect } from 'react';

const createContent = (req, res) => {
  const router = useRouter();
  const [activeForm, setActiveForm] = useState('objective');

  const changeForm = (courseString) => {
    setActiveForm(courseString);
  }

  useEffect(() => {
    setActiveForm(router.query.contentType)
  })


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