import React, { useState, useContext } from 'react';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import { GoogleLogin } from 'react-google-login';
import { useMutation } from '@apollo/react-hooks'

import Loading from '../components/Loading';
import UserContext from '../components/context/UserContext';
import hasPermission from '../lib/hasPermission';
import { Role } from '../lib/enums';
import { nonInputTypeOnVarMessage } from 'graphql/validation/rules/VariablesAreInputTypes';

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
  const [signupType, setSignupType] = useState(null);
  const router = useRouter();

  const [createUser, { data }] = useMutation(CREATE_ACCOUNT);

  const newTeacher = async (response) => {
    const login = await createUser({
      variables: {
        authToken: response.tokenId,
        userType: 'TEACHER',
      },
    });
    window.location.href = '/';
  }

  const newStudent = async (response) => {
    const login = await createUser({
      variables: {
        authToken: response.tokenId,
        userType: 'STUDENT',
      },
    });
    window.location.href = '/';
  }

  // No user (undefined, or null because not yet fetched from context)
  if (!user) return (
    <div>
      <h1>Welcome!</h1>
      <h3>Get started as a{signupType ? ` ${signupType.toLowerCase()}:` : '...'}</h3>
      <div className='buttons'>
        <GoogleLogin
          clientId="740708519996-jckm5svthu1lh5fv35jc55pp54kam9br.apps.googleusercontent.com"
          buttonText="Teacher"
          theme='dark'
          onSuccess={newTeacher}
        // onFailure={loginFail}
        />
        <GoogleLogin
          clientId="740708519996-jckm5svthu1lh5fv35jc55pp54kam9br.apps.googleusercontent.com"
          buttonText="Student"
          theme='dark'
          onSuccess={newStudent}
        // onFailure={loginFail}
        />
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
  )

  // When a user is logged in, route to appropriate area
  if (hasPermission(user, [Role.Teacher, Role.Admin, Role.SuperAdmin])) {
    router.push('/teacher')
  }
  if (hasPermission(user, [Role.Student])) {
    router.push('/student')
  }
  if (hasPermission(user, [])) {
    router.push('/student'); // should route to student if user has corrupt permissions (or none)
  }

  // defaults to return loading.
  // If there is no user (not logged in) the above welcoem will return
  // If there IS a user, it will route above to the appropriate area with it's own welcome page
  return <Loading />
}

export default HomePage;