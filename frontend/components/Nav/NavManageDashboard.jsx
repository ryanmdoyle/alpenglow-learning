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
        <NavItem href='/teacher/manage/courses'>Courses</NavItem>
        <NavItem href='/teacher/manage/classes'>Classes</NavItem>
        <NavItem href='/teacher/manage/students'>Students</NavItem>
        <NavItem href='/teacher/manage/quick-add'>Quick Add Content</NavItem>
      </ul>
    </NavSectionPadding>
  );
};

export default NavManageDashboard;