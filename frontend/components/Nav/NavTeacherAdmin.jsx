import React from 'react';
import { css } from '@emotion/core';

import NavItem from './NavItem';

const sectionPad = css`
  padding: 0 1rem;
`;

const navSectionHeader = css`
  margin: 0;
  color: var(--pink);
`;

const NavTeacherAdmin = () => {
  return (
    <div css={sectionPad}>
      <h5 css={navSectionHeader}>Curriculum</h5>
      <ul css={css`list-style:none;margin:1rem 0.2rem;padding:0;`}>
        <NavItem title='Create Content' href='/teacher/createContent' />
        <NavItem title='Playlists' href='/teacher/teacherPlaylists' />
        <NavItem title='Objectives' href='/teacher/teacherObjectives' />
        <NavItem title='Questions' href='/teacher/teacherQuestions' />
      </ul>
    </div>
  );
};

export default NavTeacherAdmin;