import React, { useContext } from 'react';
import { useRouter } from 'next/router';

import UserContext from './context/UserContext';
import hasPermission from '../lib/hasPermission';
import HomePage from '../pages/index';
import { Role } from '../lib/enums';

const ComponentWithRouteProtection = ({ Component, pageProps }) => {
  const user = useContext(UserContext);
  const router = useRouter();

  // if at /teach route, user must be teacher or Admin
  if (typeof window !== 'undefined') {
    if (
      router.pathname.startsWith('/teacher')
      &&
      !hasPermission(user, [Role.Teacher, Role.SuperAdmin])
    ) router.push('/student');
  }

  return <Component {...pageProps} />
};

export default ComponentWithRouteProtection;