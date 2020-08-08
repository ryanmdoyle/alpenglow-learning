import React, { useEffect } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { GoogleLogout } from 'react-google-login';

const LOGOUT = gql`
  mutation LOGOUT {
    logout
  }
`;

const Logout = ({ onClick }) => {
  const [alpenLogout, { data }] = useMutation(LOGOUT);

  const gqlLogout = async (response) => {
    await alpenLogout();
    window.location.href = '/';
  }

  return (
    <div onClick={gqlLogout}>
      <GoogleLogout
        clientId="740708519996-jckm5svthu1lh5fv35jc55pp54kam9br.apps.googleusercontent.com"
        buttonText="Logout"
      />
    </div>
  );
};

export default Logout;