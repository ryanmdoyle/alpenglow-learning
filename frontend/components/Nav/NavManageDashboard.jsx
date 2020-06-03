import React from 'react';
import { css } from '@emotion/core';

import NavSectionPadding from '../styled/NavSectionPadding';
import NavSectionHeader from '../styled/NavSectionHeader';
import NavItem from './NavItem';

const NavManageDashboard = () => {
  return (
    <NavSectionPadding>
      <NavSectionHeader title='Manage' />
      <ul css={css`list-style:none;margin:1rem 0.2rem;padding:0;`}>
        <NavItem title='Courses' href='/teacher/manage/courses' />
        <NavItem title='Classes' href='/teacher/manage/classes' />
        <NavItem title='Students' href='/teacher/manage/student-list' />
        <NavItem title='Quick Add Content' href='/teacher/manage/create-content' />
      </ul>
    </NavSectionPadding>
  );
};

export default NavManageDashboard;