import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { css } from '@emotion/core';

import Loading from '../components/Loading';
import UserContext from '../components/context/UserContext';

const HomePage = ({ }) => {
  const user = useContext(UserContext);

  return (
    <div css={css`padding: 0 1rem;`}>
      <h2>Welcome to Alpenglow, {user?.firstName}</h2>
    </div>
  )

}

export default HomePage;