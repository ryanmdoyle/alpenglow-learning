import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const UserContext = React.createContext(null);
UserContext.displayName = 'UserContext';

const GET_CURRENT_USER = gql`
  query GET_CURRENT_USER {
    getCurrentUser {
      firstName
      roles
    }
  }
`;

const UserProvider = ({ children }) => {
  // const currentUser = useQuery(GET_CURRENT_USER);
  const { loading, error, data } = useQuery(GET_CURRENT_USER);
  const contextValue = (!data) ? null : data;
  console.log('contextValue in user context', contextValue);
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