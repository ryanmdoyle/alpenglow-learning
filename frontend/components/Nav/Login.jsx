import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { GoogleLogin } from 'react-google-login';
import { useRouter } from 'next/router';



const Login = (props) => {
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
        // setDisabled(!disabled);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  return (
    <div {...props}>
      <GoogleLogin
        clientId="740708519996-jckm5svthu1lh5fv35jc55pp54kam9br.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={fromGoogle}
        onFailure={fromGoogle}
        disabled={props.disabled}
      />
    </div>
  );
};

export default Login;