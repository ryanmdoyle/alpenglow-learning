import React, { useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import fetch from 'isomorphic-unfetch';


const Login = () => {
  const fromGoogle = (response) => {

    fetch('http://localhost:4000/auth/google', {
      method: 'POST',
      credentials: "include", //MUST include for client to set cookie
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `${response.tokenId}`,
      },
    })
      // .then((res) => {
      //   console.log('fetch sent from Login component.');
      // })
      .catch((err) => {
        console.error(err);
      })
  }

  const logout = (response) => {
    console.log(response);
  }


  return (
    <>
      <GoogleLogin
        clientId="740708519996-jckm5svthu1lh5fv35jc55pp54kam9br.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={fromGoogle}
        onFailure={fromGoogle}
      />
      <GoogleLogout
        clientId="740708519996-jckm5svthu1lh5fv35jc55pp54kam9br.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={logout}
      >
      </GoogleLogout>
    </>
  );
};

export default Login;