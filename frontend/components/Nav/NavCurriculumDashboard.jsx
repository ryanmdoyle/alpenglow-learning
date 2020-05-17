import React from 'react';
import { css } from '@emotion/core';

import NavSectionPadding from '../styled/NavSectionPadding';
import NavSectionHeader from '../styled/NavSectionHeader';
import NavItem from './NavItem';

const NavCurriculumDashboard = () => {
  return (
    <NavSectionPadding>
      <NavSectionHeader title='Curriculum' />
      <ul css={css`list-style:none;margin:1rem 0.2rem;padding:0;`}>
        <NavItem title='Courses' href='/teacher/courses' />
        <NavItem title='Classes' href='/teacher/classes' />
        <NavItem title='Manage Students' href='/teacher/manageStudents' />
        <NavItem title='Quick Add Content' href='/teacher/createContent' />
      </ul>
    </NavSectionPadding>
  );
};

export default NavCurriculumDashboard;