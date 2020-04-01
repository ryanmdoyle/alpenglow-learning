import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const CURRENT_USER = gql`
  {
    currentUser {
      firstName
      _id
    }
  }
`;

const CurrentUser = (props) => {
  return (
    <div props={}>

    </div>
  );
};

export default CurrentUser;