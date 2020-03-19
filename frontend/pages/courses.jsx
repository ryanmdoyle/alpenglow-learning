import React from 'react';
import { css } from '@emotion/core';


import CourseContainer from '../components/CourseContainer';

const courses = () => {
  return (
    <content>
      <CourseContainer name='Math'/>
      <CourseContainer name='Science'/>
      <CourseContainer name='English'/>
      <CourseContainer name='Social Studies'/>
      <CourseContainer name='Social Studies'/>
    </content>
  );
};

export default courses;