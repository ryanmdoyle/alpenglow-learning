import React from 'react';
import { css } from '@emotion/core';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import NavItem from './NavItem';
import Loading from '../Loading';

const sectionPad = css`
  padding: 0 1rem;
`;

const navSectionHeader = css`
  margin: 0;
  color: var(--pink);
`;

const NavStudentProgress = () => {
  // const { loading, error, data } = useQuery(INSTRUCTING_COURSES_QUERY);
  // if (loading) return <Loading />
  return (
    <div css={sectionPad}>
      <h5 css={navSectionHeader}>Student Progress</h5>
      <ul css={css`list-style:none;margin:1rem 0.2rem;padding:0;`}>
        <NavItem title='All Your Students' href='/teacher/classes' />
        <div css={css`padding-left: 1rem;`}>
          <NavItem title='Class 1' href='/teacher/allStudents' />
        </div>
        <div css={css`padding-left: 1rem;`}>
          <NavItem title='Class 2' href='/teacher/allStudents' />
        </div>
        <NavItem title='Grading' href='/teacher/grading' />

      </ul>
    </div>
  );
};

export default NavStudentProgress;