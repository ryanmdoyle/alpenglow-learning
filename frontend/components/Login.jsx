import React, { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import jwt from 'jwt-simple';


const Login = () => {
  const fromGoogle = (response) => {
    console.log(response);
  }

  return (
    <GoogleLogin
      clientId="740708519996-jckm5svthu1lh5fv35jc55pp54kam9br.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={fromGoogle}
      onFailure={fromGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default Login;