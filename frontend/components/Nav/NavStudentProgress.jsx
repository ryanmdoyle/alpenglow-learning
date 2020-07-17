import React from 'react';
import { css } from '@emotion/core';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import NavSectionPadding from '../styled/blocks/NavSectionPadding';
import NavSectionHeader from '../styled/elements/NavSectionHeader';
import NavItem from './NavItem';
import Loading from '../Loading';

const innerPadding = css`padding-left: 1rem;`;

const INSTRUCTING_CLASSES_QUERY = gql`
  query INSTRUCTING_CLASSES_QUERY {
    getInstructingClasses {
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
        <NavItem href='/teacher/progress/students' as='/teacher/progress/students' css={css`padding-left: 2rem;`}>All Students</NavItem>
        {data?.getInstructingClasses?.map(c => (
          <div css={innerPadding} key={c._id}>
            <NavItem href='/teacher/progress/students/[classId]' as={`/teacher/progress/students/${c._id}`}>{c.name}</NavItem>
          </div>
        ))}
        <NavItem href='/teacher/progress/grading' as='/teacher/progress/grading'>Grading</NavItem>
      </ul>
    </NavSectionPadding>
  );
};

export default NavStudentProgress;
export { INSTRUCTING_CLASSES_QUERY };