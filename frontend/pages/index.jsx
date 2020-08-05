import React, { useState, useContext } from 'react';
import Head from 'next/head';
import { css } from '@emotion/core';
import { useRouter } from 'next/router';

import Welcome from '../components/welcome/Welcome';
import Loading from '../components/Loading';
import CreateAccount from '../components/CreateAccount';
import UserContext from '../components/context/UserContext';
import hasPermission from '../lib/hasPermission';
import { Role } from '../lib/enums';

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

const HomePage = ({ }) => {
  // home should render index/welcome page, or push logged in users to appropriate page
  const user = useContext(UserContext);
  const router = useRouter();

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
        <Welcome />
        <CreateAccount />
      </div>
    )
  }

  return <Loading />

}

export default HomePage;