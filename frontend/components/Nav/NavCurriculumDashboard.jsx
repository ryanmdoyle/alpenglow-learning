import React from 'react';
import { css } from '@emotion/core';

import NavItem from './NavItem';

const sectionPad = css`
  padding: 0 1rem;
`;

const subSectionPad = css`
  padding-left: 1rem;
`;

const navSectionHeader = css`
  margin: 0;
  color: var(--pink);
`;

const NavCurriculumDashboard = () => {
  return (
    <div css={sectionPad}>
      <h5 css={navSectionHeader}>Curriculum</h5>
      <ul css={css`list-style:none;margin:1rem 0.2rem;padding:0;`}>
        <NavItem title='Courses' href='/teacher/courses' />
        <NavItem title='Classes' href='/teacher/classes' />
        <NavItem title='Manage Students' href='/teacher/manageStudents' />
        <NavItem title='Quick Add Content' href='/teacher/createContent' />
      </ul>
    </div>
  );
};

export default NavCurriculumDashboard;