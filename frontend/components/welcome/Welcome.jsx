import React from 'react';
import { css } from '@emotion/core';

import PagePadding from '../styled/PagePadding';

const img = css`
  width: 100%;
  border-radius: var(--borderRadius);
  box-shadow: var(--shadowLight);
`;

const Welcome = () => {
  return (
    <PagePadding>
      <h2>Welcome!</h2>
      <p>Alpenglow Learning is a digital learning platform for teachers and students that allows teachers to create customized playlists of learning resources, work, and quizzes. </p>
      <p>These custom playlists let teachers bring together resources from all their favorite websites into a single place for students.</p>

      <h4>Course Curriculum</h4>
      <p>Teachers are able to create courses of curriculum content.  Each course can have multiple classes of students, and courses can be shared with multiple teachers.</p>
      <p>Students are able to see progress for their courses at a glance so they can learn to manage their time and plan what areas they need to work on next!</p>
      <img src='/course-view.png' alt='Course preview' css={img}></img>

      <h4>Teacher Created Playlists</h4>
      <p>Each playlist is composed of learning objectives that can have any number of different learning resources.  These resources are simple links to other sites, so it allows teachers to combine plans and assignments for many places all in one place.  </p>
      <p>Playlists have teacher-created quizzes for measuring student progress. You bring your own quizzes, but there is no need to recreate the wheel! Teachers can enter scores for paper assessments they already have, or link to Google Form quizzes to provide a locked-down quiz environment.</p>
      <img src='/playlist.png' alt='playlist preview' css={img}></img>

      <h4>Student Class Views</h4>
      <p>Students can view progress for their classes, seeing their curriculum at a glance, view previous scores, and set weekly goals, in addition to setting short-term to-do's.</p>
      <img src='/class-view.png' alt='class preview' css={img}></img>

      <h4>Grades</h4>
      <p>Teachers and students can view all grades for each course at a glance.</p>
      <img src='/grades.png' alt='grades preview' css={img}></img>
    </PagePadding>
  );
};

export default Welcome;