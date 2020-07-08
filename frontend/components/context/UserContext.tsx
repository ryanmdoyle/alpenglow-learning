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
  const userData = loading ? { loading: true } : contextValue?.getCurrentUser;
  console.log('user data in ctx', userData)
  return (
    <UserContext.Provider
      value={
        // contextValue?.getCurrentUser
        userData
      }
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
export default UserContext;