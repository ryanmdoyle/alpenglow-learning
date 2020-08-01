import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { GoogleLogin } from 'react-google-login';
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/react-hooks';

import AlertContext from '../context/AlertContext';

const LOGIN = gql`
  mutation LOGIN($authToken: String!) {
    login(authToken: $authToken)
  }
`;

const Login = (props) => {
  const alert = useContext(AlertContext);
  const router = useRouter();
  const [googleLogin, { data }] = useMutation(LOGIN, {
    onCompleted: () => {window.location.href = '/'},
    onError: () => {
      alert.error('No account with that email address!  Please create an account first.')
    }
  });

  const gqlLogin = async (response) => {
    const login = await googleLogin({
      variables: { authToken: response.tokenId },
    });
  }

  const loginFail = (response) => {
    alert.error('Unable to sign in to your Google account.')
  }

  return (
    <div {...props}>
      <GoogleLogin
        clientId="740708519996-jckm5svthu1lh5fv35jc55pp54kam9br.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={gqlLogin}
        onFailure={loginFail}
        disabled={props.disabled}
      />
    </div>
  );
};

export default Login;