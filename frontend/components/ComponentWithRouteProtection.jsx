import React, { useContext } from 'react';
import { useRouter } from 'next/router';

import UserContext from './context/UserContext';
import hasPermission from '../lib/hasPermission';
import { Role } from '../lib/enums';

const ComponentWithRouteProtection = ({ Component, pageProps }) => {
  const user = useContext(UserContext);
  const router = useRouter();
  if (user?.loading) return <Loading />

  if (!user._id && router.pathname.startsWith('/teacher') || !user._id && router.pathname.startsWith('/student')) {
    router.push('/');
  }

  // if at /teach route, user must be teacher or Admin
  if (user && (typeof window !== 'undefined')) {
    if (router.pathname.startsWith('/teacher') && !hasPermission(user, [Role.Teacher, Role.Admin, Role.SuperAdmin])) {
      router.push('/student');
    }
  }
  return <Component {...pageProps} />
};

export default ComponentWithRouteProtection;