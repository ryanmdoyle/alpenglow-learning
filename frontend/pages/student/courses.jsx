import React from 'react';
import { css } from '@emotion/core';

import PageTitle from '../../components/PageTitle';
import CourseTimeline from '../../components/courses/CourseTimeline';
import Loading from '../../components/Loading';

const studentCourses = () => {
  return (
    <>
      <PageTitle>All Courses</PageTitle>
      <CourseTimeline name='Math' />
      <CourseTimeline name='Science' />
      <CourseTimeline name='English' />
      <CourseTimeline name='Social Studies' />
      <CourseTimeline name='Social Studies' />
    </>
  );
};

export default studentCourses;