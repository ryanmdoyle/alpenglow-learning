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
  
  const userValue = {
    firstName: data?.getUserCurrent?.firstName || null,
    roles: data?.getUserCurrent?.roles || null,
    loading: loading ? true : false,
    _id: data?.getUserCurrent?._id || null,
    refetch: refetch || null,
  } 
  
  return (
    <UserContext.Provider
      value={ userValue }
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
export default UserContext;