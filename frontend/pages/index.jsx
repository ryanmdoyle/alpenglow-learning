import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { css } from '@emotion/core';

import Loading from '../components/Loading';

const HomePage = ({ currentUser }) => {

  return (
    <div css={css`padding: 0 1rem;`}>
      <h2>Welcome to Alpenglow!</h2>
      {currentUser ? <h1>{currentUser.firstName}</h1> : null}
    </div>
  )

}

export default HomePage;