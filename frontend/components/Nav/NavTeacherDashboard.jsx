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

const INSTRUCTING_COURSES_QUERY = gql`
  query INSTRUCTING_COURSES_QUERY {
    getInstructingCourses {
      name
      _id
    }
  }
`;

const NavTeacherDashBoard = () => {
  const { loading, error, data } = useQuery(INSTRUCTING_COURSES_QUERY);
  if (loading) return <Loading />
  return (
    <div css={sectionPad}>
      <h5 css={navSectionHeader}>Teaching Dashboard</h5>
      <ul css={css`list-style:none;margin:1rem 0.2rem;padding:0;`}>
        {data.getInstructingCourses && data.getInstructingCourses.map(course => (
          <NavItem title={course.name} href={`/teacher/course/${course._id}`} key={course._id} />
        ))}
        <NavItem title='View Classes' href='/teacher/classes' />
        <NavItem title='View Students' href='/teacher/allStudents' />
        <NavItem title='Grading' href='/teacher/grading' />

      </ul>
    </div>
  );
};

export default NavTeacherDashBoard;