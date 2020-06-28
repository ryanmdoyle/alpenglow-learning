import React, { useContext } from 'react';
import { useRouter } from 'next/router';

import UserContext from './context/UserContext';
import hasPermission from '../lib/hasPermission';
import HomePage from '../pages/index';
import { Role } from '../lib/enums';

const ComponentWithRoles = ({ Component, pageProps }) => {
  const user = useContext(UserContext);
  const router = useRouter();

  // if at /student route, user must be student or Super
  if (
    router.pathname.startsWith('/student')
    &&
    hasPermission(user, [Role.Student, Role.SuperAdmin])
  ) return <Component {...pageProps} />

  // if at /teach route, user must be teacher or Admin
  if (
    router.pathname.startsWith('/teacher')
    &&
    hasPermission(user, [Role.Teacher, Role.SuperAdmin, Role.Admin])
  ) return <Component {...pageProps} />

  return (
    <HomePage />
  );
};

export default ComponentWithRoles;