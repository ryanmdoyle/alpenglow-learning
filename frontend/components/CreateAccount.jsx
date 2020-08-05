import React, { useContext, useState } from 'react';
import gql from 'graphql-tag';
import Head from 'next/head';
import { css } from '@emotion/core';
import { useRouter } from 'next/router';
import { GoogleLogin } from 'react-google-login';
import { useMutation } from '@apollo/react-hooks'

import UserContext from './context/UserContext';
import AlertContext from './context/AlertContext';

const welcome = css`
  text-align: center;
  padding-bottom: 3rem;
  .buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    button { 
      margin: 0.5rem;
      width: 110px;
    }
    
  }
  @media (max-width: 500px) {
    font-size: 0.7rem;
    .buttons {
      flex-direction: column;
    }
  }
  @media (max-width: 350px) {
    font-size: 0.5rem;
  }
`;

const CREATE_ACCOUNT = gql`
  mutation CREATE_ACCOUNT(
    $authToken: String!,
    $userType: String!,
  ) {
    createAccount(
      authToken: $authToken,
      userType: $userType,
    ) {
      _id
    }
  }
`;

const CreateAccount = () => {
  const user = useContext(UserContext);
  const alert = useContext(AlertContext);
  const router = useRouter();
  const [signupType, setSignupType] = useState(null);
  const [createUser, { data }] = useMutation(CREATE_ACCOUNT, {
    onError: (error) => {
      alert.error('Account already exists. Please log in.', 10);
    },
    onCompleted: () => { window.location.href = '/' }
  });

  const newTeacher = async (response) => {
    const login = await createUser({
      variables: {
        authToken: response.tokenId,
        userType: 'TEACHER',
      },
    });
  }

  const newStudent = async (response) => {
    const login = await createUser({
      variables: {
        authToken: response.tokenId,
        userType: 'STUDENT',
      },
    });
  }

  return (
    <div css={welcome}>
      <h3>Get started as a{signupType ? ` ${signupType.toLowerCase()}:` : '...'}</h3>
      <div className='buttons'>
        <div
          onMouseEnter={() => { setSignupType('teacher') }}
          onMouseLeave={() => { setSignupType(null) }}
        >
          <GoogleLogin
            clientId="740708519996-jckm5svthu1lh5fv35jc55pp54kam9br.apps.googleusercontent.com"
            buttonText="Teacher"
            theme='dark'
            onSuccess={newTeacher}
          // onFailure={loginFail}
          />
        </div>
        <div
          onMouseEnter={() => { setSignupType('student') }}
          onMouseLeave={() => { setSignupType(null) }}
        >
          <GoogleLogin
            clientId="740708519996-jckm5svthu1lh5fv35jc55pp54kam9br.apps.googleusercontent.com"
            buttonText="Student"
            theme='dark'
            onSuccess={newStudent}
          // onFailure={loginFail}
          />
        </div>
        <div>
          <GoogleLogin
            clientId="740708519996-jckm5svthu1lh5fv35jc55pp54kam9br.apps.googleusercontent.com"
            buttonText="Parent"
            theme='dark'
            disabled={true}
          // onSuccess={gqlLogin}
          // onFailure={loginFail}
          />
        </div>
      </div>
      <small css={css`font-size: 0.7rem;`}>Parent access coming soon!</small>
    </div>
  );
};

export default CreateAccount;