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

const enrolledCourses = css`padding-left: 1rem;`;

const GET_ENROLLED_COURSES_QUERY = gql`
  query GET_ENROLLED_COURSES_QUERY {
    getEnrolledCourses {
      name
      _id
    }
  }
`;

const NavStudentDashboard = props => {
  const { loading, error, data } = useQuery(GET_ENROLLED_COURSES_QUERY);

  if (loading) return <Loading />;

  return (
    <div css={sectionPad}>
      <h5 css={navSectionHeader}>Student Dashboard</h5>
      <ul css={css`list-style:none;margin:1rem 0.2rem;padding:0;`}>
        <NavItem title='All Courses' href='/student/courses' />
        {data.getEnrolledCourses && (
          <div css={enrolledCourses}>
            {data.getEnrolledCourses.map(course => {
              const courseHref = `/student/course/${course._id}`;
              return <NavItem title={course.name} href={courseHref} key={course._id} />
            })}
          </div>
        )}
        <NavItem title='Grades' href='/student/grades' />
        <Enroll />
      </ul>
    </div>
  );
};

export default NavStudentDashboard;
export { GET_ENROLLED_COURSES_QUERY };