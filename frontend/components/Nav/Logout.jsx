import React, { useEffect } from 'react';
import Router from 'next/router';
import { GoogleLogout } from 'react-google-login';
import fetch from 'isomorphic-unfetch';


const Logout = () => {

  const logout = (response) => {
    fetch('http://localhost:4000/auth/google/logout', {
      method: 'POST',
      credentials: "include", //MUST include for client to set cookie
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        // in future, make Apollo cache reload
        window.location.href = '/';
      })
      .catch((err) => {
        console.error(err);
      })
  }


  return (
    <GoogleLogout
      clientId="740708519996-jckm5svthu1lh5fv35jc55pp54kam9br.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={logout}
    />
  );
};

export default Logout;