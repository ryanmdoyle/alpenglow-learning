import React, { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';


const Login = () => {
  const router = useRouter();
  const fromGoogle = (response) => {

    fetch('http://localhost:4000/auth/google/login', {
      method: 'POST',
      credentials: "include", //MUST include for client to set cookie
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `${response.tokenId}`,
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
    <GoogleLogin
      clientId="740708519996-jckm5svthu1lh5fv35jc55pp54kam9br.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={fromGoogle}
      onFailure={fromGoogle}
    />
  );
};

export default Login;