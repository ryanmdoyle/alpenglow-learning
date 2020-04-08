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

const NavTeacher = () => {
  return (
    <div css={sectionPad}>
      <h5 css={navSectionHeader}>Teacher Admin</h5>
      <ul css={css`list-style:none;margin:1rem 0.2rem;padding:0;`}>
        <NavItem title='Create Content' href='/createContent' />
        <NavItem title='Playlists' href='/teacherPlaylists' />
        <NavItem title='Objectives' href='/teacherObjectives' />
        <NavItem title='Questions' href='/teacherQuestions' />
      </ul>
    </div>
  );
};

export default NavTeacher;