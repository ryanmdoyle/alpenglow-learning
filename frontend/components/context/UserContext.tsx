import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const UserContext = React.createContext(null);
UserContext.displayName = 'UserContext';

const GET_CURRENT_USER = gql`
  query GET_CURRENT_USER {
    getCurrentUser {
      firstName
      permissions
    }
  }
`;

const UserProvider = ({ children }) => {
  const currentUser = useQuery(GET_CURRENT_USER);

  return (
    <UserContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
export default UserContext;