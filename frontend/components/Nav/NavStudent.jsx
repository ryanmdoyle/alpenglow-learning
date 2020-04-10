import React from 'react';
import { css } from '@emotion/core';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import NavItem from './NavItem';
import Enroll from './Enroll';
import Loading from '../Loading';

const sectionPad = css`
  padding: 0 1rem;
`;

const navSectionHeader = css`
  margin: 0;
  color: var(--pink);
`;

const GET_USER_COURSES_QUERY = gql`
  query GET_USER_COURSES {
    getUserCourses {
      name
      _id
    }
  }
`;

const NavStudent = props => {
  const { loading, error, data } = useQuery(GET_USER_COURSES_QUERY);

  if (loading) return <Loading />;
  if (error) {
    console.log("SHIT");
  }

  return (
    <div css={sectionPad}>
      <h5 css={navSectionHeader}>Student Dashboard</h5>
      <ul css={css`list-style:none;margin:1rem 0.2rem;padding:0;`}>
        <NavItem title='All Courses' href='/student/studentCourses' />
        {data.getUserCourses.map(course => {
          const courseHref = `/student/course/${course._id}`;
          return <NavItem title={course.name} href={courseHref} />
        })}
        <NavItem title='Grades' href='/student/studentGrades' />
        <Enroll />
      </ul>
    </div>
  );
};

export default NavStudent;
export { GET_USER_COURSES_QUERY };