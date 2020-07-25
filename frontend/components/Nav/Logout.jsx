import React, { useEffect } from 'react';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { GoogleLogout } from 'react-google-login';

const LOGOUT = gql`
  mutation LOGOUT {
    logout
  }
`;


const Logout = () => {
  const [alpenLogout, { data }] = useMutation(LOGOUT);

  const gqlLogout = async (response) => {
    const logout = await alpenLogout();
    window.location.href = '/';
  }

  return (
    <GoogleLogout
      clientId="740708519996-jckm5svthu1lh5fv35jc55pp54kam9br.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={gqlLogout}
    />
  );
};

export default Logout;