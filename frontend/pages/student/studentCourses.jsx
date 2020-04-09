import React from 'react';
import { css } from '@emotion/core';

import PageTitle from '../../components/PageTitle';
import CourseContainer from '../../components/CourseContainer';

const studentCourses = () => {
  return (
    <>
      <PageTitle title='All Courses' />
      <CourseContainer name='Math' />
      <CourseContainer name='Science' />
      <CourseContainer name='English' />
      <CourseContainer name='Social Studies' />
      <CourseContainer name='Social Studies' />
    </>
  );
};

export default studentCourses;