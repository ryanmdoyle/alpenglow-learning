import React, { useState, useContext } from 'react';
import gql from 'graphql-tag';
import Head from 'next/head';
import { css } from '@emotion/core';
import { useRouter } from 'next/router';
import { GoogleLogin } from 'react-google-login';
import { useMutation } from '@apollo/react-hooks'

import Loading from '../components/Loading';
import UserContext from '../components/context/UserContext';
import AlertContext from '../components/context/AlertContext';
import hasPermission from '../lib/hasPermission';
import { Role } from '../lib/enums';

const welcome = css`
  text-align: center;
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

const HomePage = ({ }) => {
  // home should render index/welcome page, or push logged in users to appropriate page
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

  if (hasPermission(user, [Role.Teacher, Role.Admin, Role.SuperAdmin])) {
    router.push('/teacher')
  }
  if (hasPermission(user, [Role.Student])) {
    router.push('/student')
  }
  if (hasPermission(user, [])) {
    router.push('/student'); // should route to student if user has corrupt permissions (or none)
  }

  if (!user._id || user._id === null) {
    return (
      <div css={welcome}>
        <Head>
          <title>Alpenglow Learning - Login</title>
          <meta name='description' content='A platform for student driven learning'></meta>
        </Head>
        <h1>Welcome!</h1>
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
    )
  }

  return <Loading />

}

export default HomePage;