import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { css } from '@emotion/core';

import Loading from '../components/Loading';

const GET_CURRENTUSER = gql`
  query currentUser {
    currentUser {
      googleId
      firstName
    }
  }
`;

const HomePage = () => {
  const { loading, error, data } = useQuery(GET_CURRENTUSER);

  if (loading) return (
    <Loading />
  )

  return (
    <div css={css`padding: 0 1rem;`}>
      <h2>Welcome to Alpenglow!</h2>
      {data.currentUser ? <h1>{data.currentUser.firstName}</h1> : null}
    </div>
  )

}

export default HomePage;
export { GET_CURRENTUSER };