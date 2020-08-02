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
  const { loading, error, data, refetch } = useQuery(GET_CURRENT_USER);
  const contextValue = (!data) ? null : data;
  const userData = loading ? { loading: true } : contextValue?.getUserCurrent;
  return (
    <UserContext.Provider
      value={
        {
          firstName: userData.firstName,
          roles: userData.roles,
          _id: userData._id,
          refetch: refetch
        }
      }
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
export default UserContext;