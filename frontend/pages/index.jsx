import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { css } from '@emotion/core';

import Loading from '../components/Loading';
import UserContext from '../components/context/UserContext';
import hasPermission from '../lib/hasPermission';
import PageTitle from '../components/PageTitle';
import PagePadding from '../components/styled/PagePadding';
import StudentWelcome from '../components/welcome/StudentWelcome';
import TeacherWelcome from '../components/welcome/TeacherWelcome';
import { Roles } from '../lib/enums';

const HomePage = ({ }) => {
  const user = useContext(UserContext);
  return (
    <div>
      <PageTitle>Welcome to Alpenglow!</PageTitle>
      <PagePadding>
        {hasPermission(user, [Roles.Student, Roles.SuperAdmin]) && (
          <StudentWelcome user={user} />
        )}
        {hasPermission(user, [Roles.Teacher, Roles.SuperAdmin]) && (
          <TeacherWelcome user={user} />
        )}
      </PagePadding>
    </div>
  )
}

export default HomePage;