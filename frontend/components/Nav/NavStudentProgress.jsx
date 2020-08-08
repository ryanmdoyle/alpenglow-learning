import React from 'react';
import { css } from '@emotion/core';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

import NavSectionPadding from '../styled/blocks/NavSectionPadding';
import NavSectionHeader from '../styled/elements/NavSectionHeader';
import NavItem from './NavItem';
import Loading from '../Loading';

const INSTRUCTING_CLASSES_QUERY = gql`
  query INSTRUCTING_CLASSES_QUERY {
    getClassesInstructing {
      _id
      name
    }
  }
`;

const NavStudentProgress = () => {
  const { loading, error, data } = useQuery(INSTRUCTING_CLASSES_QUERY);
  if (loading) return <Loading />
  return (
    <NavSectionPadding>
      <NavSectionHeader title='Student Progress' />
      <ul css={css`list-style:none;margin:1rem 0.2rem;padding:0;`}>
        <NavItem href='/teacher/progress/students' as='/teacher/progress/students'>All Students</NavItem>
        {data?.getClassesInstructing?.map(c => (

          <NavItem
            href='/teacher/progress/students/[classId]'
            as={`/teacher/progress/students/${c._id}`}
            key={c._id}
            css={css`margin-left: 1rem;`}
          >{c.name}</NavItem>

        ))}
        <NavItem href='/teacher/progress/grading' as='/teacher/progress/grading'>Grading</NavItem>
      </ul>
    </NavSectionPadding>
  );
};

export default NavStudentProgress;
export { INSTRUCTING_CLASSES_QUERY };