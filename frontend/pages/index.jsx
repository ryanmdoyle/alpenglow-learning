import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { withApollo } from '../lib/apollo';
import { css } from '@emotion/core';

import Login from '../components/Login';
import Logout from '../components/Logout';

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
  if (loading) return null
  return (
    <div css={css`padding: 0 1rem;`}>
      <h2>Welcome to Alpenglow!</h2>
      {loading && <p>Loading...</p>}
      {data.currentUser ? <h1>{data.currentUser.firstName}</h1> : null}
    </div>
  )

}

export default withApollo({ ssr: false })(HomePage)
// export default HomePage;
export { GET_CURRENTUSER };