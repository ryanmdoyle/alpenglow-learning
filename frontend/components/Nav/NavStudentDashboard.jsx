import React from 'react';
import { css } from '@emotion/core';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import NavSectionPadding from '../styled/blocks/NavSectionPadding';
import NavSectionHeader from '../styled/elements/NavSectionHeader';
import NavItem from './NavItem';
import Loading from '../Loading';
import { GET_ENROLLED_CLASSES } from '../../gql/queries';

const enrolledClasses = css`padding-left: 1rem;`;

const NavStudentDashboard = props => {
  const { loading, error, data } = useQuery(GET_ENROLLED_CLASSES);
  const studentHasEnrollments = data?.getEnrolledClasses?.length > 0;
  if (loading) return <Loading />;
  return (
    <NavSectionPadding>
      <NavSectionHeader title='Student Dashboard' />
      <ul css={css`list-style:none;margin:1rem 0.2rem;padding:0;`}>
        {studentHasEnrollments && (
          <>
            <NavItem href='/student/classes' as='/student/classes'>All Classes</NavItem>
            {data.getEnrolledClasses && (
              <div css={enrolledClasses}>
                {data.getEnrolledClasses.map(c => (
                  <NavItem href='/student/classes/[classId]' as={`/student/classes/${c._id}`} key={c._id}>{c.name}</NavItem>
                ))}
              </div>
            )}
            <NavItem href='/student/grades' as='/student/grades'>Grades</NavItem>
          </>
        )}
        <NavItem href='/student/enroll' as='/student/enroll'>Enroll in New Class</NavItem>
      </ul>
    </NavSectionPadding>
  );
};

export default NavStudentDashboard;