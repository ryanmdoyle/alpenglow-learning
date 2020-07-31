import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const UserContext = React.createContext(null);
UserContext.displayName = 'UserContext';

const GET_CURRENT_USER = gql`
  query GET_CURRENT_USER {
    getUserCurrent {
      _id
      firstName
      roles
    }
  }
`;

const UserProvider = ({ children }) => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER, {
    pollInterval: 1000 * 60 * 5, //check for user every 5 min on frontend
  });
  const contextValue = (!data) ? null : data;
  const userData = loading ? { loading: true } : contextValue?.getUserCurrent;
  return (
    <UserContext.Provider
      value={
        // contextValue?.getUserCurrent
        userData
      }
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
export default UserContext;