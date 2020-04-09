import React from 'react';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';

import NavItem from './NavItem';
import Enroll from './Enroll';

const sectionPad = css`
  padding: 0 1rem;
`;

const navSectionHeader = css`
  margin: 0;
  color: var(--pink);
`;

const NavStudent = props => {
  return (
    <div css={sectionPad}>
      <h5 css={navSectionHeader}>Student Dashboard</h5>
      <ul css={css`list-style:none;margin:1rem 0.2rem;padding:0;`}>
        <NavItem title='All Courses' href='/student/studentCourses' />
        <NavItem title='Grades' href='/student/studentGrades' />
        <Enroll />
      </ul>
    </div>
  );
};

export default NavStudent;