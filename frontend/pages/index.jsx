import React, { useState, useContext } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { css } from '@emotion/core';
import { useRouter } from 'next/router';

import Loading from '../components/Loading';
import UserContext from '../components/context/UserContext';
import hasPermission from '../lib/hasPermission';
import PageTitle from '../components/PageTitle';
import PagePadding from '../components/styled/blocks/PagePadding';
import StudentWelcome from '../components/welcome/StudentWelcome';
import TeacherWelcome from '../components/welcome/TeacherWelcome';
import TextButton from '../components/styled/elements/TextButton';
import { Role } from '../lib/enums';

const HomePage = ({ }) => {
  // home should render index/welcome page, or push logged in users to appropriate page
  const user = useContext(UserContext);
  const [signupType, setSignupType] = useState(null);
  const router = useRouter();
  if (hasPermission(user, [Role.Teacher, Role.Admin, Role.SuperAdmin])) {
    router.push('/teacher')
  }
  if (hasPermission(user, [Role.Student])) {
    router.push('/student')
  }
  return (
    <div>
      <h1>Welcome!</h1>
      <h3>Get started as a{signupType ? ` ${signupType.toLowerCase()}:` : '...'}</h3>
      <div className='buttons'>
        <TextButton css={css`width: 150px;`} onClick={() => { setSignupType('TEACHER') }}>Teacher</TextButton>
        <TextButton css={css`width: 150px;`} onClick={() => { setSignupType('STUDENT') }}>Student</TextButton>
        <TextButton css={css`width: 150px;`} onClick={() => { setSignupType('PARENT') }}>Parent</TextButton>
      </div>
    </div>
  )
}

export default HomePage;