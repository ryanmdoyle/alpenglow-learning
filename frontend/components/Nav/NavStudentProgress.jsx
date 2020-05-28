import React from 'react';
import { css } from '@emotion/core';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import NavSectionPadding from '../styled/NavSectionPadding';
import NavSectionHeader from '../styled/NavSectionHeader';
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
        <NavItem title='All Students' href='/teacher/students' css={css`padding-left: 2rem;`} />
        {data?.getInstructingClasses?.map(c => (
          <div css={innerPadding} key={c._id}>
            <NavItem title={c.name} href='/teacher/allStudents' />
          </div>
        ))}
        <NavItem title='Grading' href='/teacher/grading' />
      </ul>
    </NavSectionPadding>
  );
};

export default NavStudentProgress;
export { INSTRUCTING_CLASSES_QUERY };