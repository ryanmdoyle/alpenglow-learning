import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { css } from '@emotion/core';

import Loading from '../components/Loading';

const GET_CURRENT_USER = gql`
  query GET_CURRENT_USER {
    getCurrentUser {
      googleId
      firstName
    }
  }
`;

const HomePage = () => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER);

  if (loading) return (
    <Loading />
  )
  return (
    <div css={css`padding: 0 1rem;`}>
      <h2>Welcome to Alpenglow!</h2>
      {data.getCurrentUser ? <h1>{data.getCurrentUser.firstName}</h1> : null}
    </div>
  )

}

export default HomePage;
export { GET_CURRENT_USER };