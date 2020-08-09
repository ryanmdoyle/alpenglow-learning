import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { css } from '@emotion/core'

import Loading from '../../components/Loading';
import PagePadding from '../styled/PagePadding';

const contributorRow = css`
  margin: 0 2rem;
  padding: 0.5rem 1rem;
  border-radius: var(--borderRadius);
  display: fles;
  align-items: center;
  justify-content: space-between;
  transition: box-shadow 0.3s;
  :hover {
    box-shadow: var(--shadowMedium);
    transition: box-shadow 0.3s;
  }
`;

const GET_COURSE_CONTRIBUTORS = gql`
  query GET_COURSE_CONTRIBUTORS($courseId: ID!) {
    getCourseContributors(courseId: $courseId) {
      _id
      name
      email
    }
  }
`;

const CourseContributors = ({ courseId }) => {
  const { data, loading, error } = useQuery(GET_COURSE_CONTRIBUTORS, {
    variables: {
      courseId: courseId,
    }
  })
  console.log('contributor data', data)
  return (
    <>
      {loading ? <Loading /> : (
        <PagePadding>
          <h4>Current Contributors</h4>
          <div css={css`padding-top: 0.5rem;`}>

          </div>
          {data?.getCourseContributors.map(user => (
            <div key={user._id} css={contributorRow}>
              <div>{user.name}</div>
              <div>{user.email}</div>
            </div>
          ))}
        </PagePadding>
      )
      }
    </>
  );
};

export default CourseContributors;