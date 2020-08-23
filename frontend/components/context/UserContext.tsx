import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';

const UserContext = React.createContext(null);
UserContext.displayName = 'UserContext';

const GET_CURRENT_USER = gql`
  query GET_CURRENT_USER {
    getUserCurrent {
      _id
      firstName
      roles
      picture
      email
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
    picture: data?.getUserCurrent?.picture || null,
    email: data?.getUserCurrent?.email || null,
  }

  return (
    <UserContext.Provider
      value={userValue}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
export default UserContext;