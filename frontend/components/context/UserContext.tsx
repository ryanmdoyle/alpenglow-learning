import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const UserContext = React.createContext(null);
UserContext.displayName = 'UserContext';

const GET_CURRENT_USER = gql`
  query GET_CURRENT_USER {
    getCurrentUser {
      _id
      firstName
      roles
    }
  }
`;

const UserProvider = ({ children }) => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER);
  const contextValue = (!data) ? null : data;

  return (
    <UserContext.Provider
      value={
        contextValue?.getCurrentUser
      }
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
export default UserContext;