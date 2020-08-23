import React, { useContext } from 'react';
import { css } from '@emotion/core';
import Link from 'next/link';

import NavManageDashboard from './NavManageDashboard';
import NavStudentProgress from './NavStudentProgress';
import SiteTitle from './SiteTitle';
import Logout from './Logout';
import UserContext from '../context/UserContext';
import NavStudentDashboard from './NavStudentDashboard';
import hasPermission from '../../lib/hasPermission';
import { Role } from '../../lib/enums';

const navStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;
  z-index: 100;
`;

const navSection = css`
  width: 100%;
  padding: 1rem 0 0.25rem 0;
`;

const lower = css`
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const NavPanel = () => {
  const user = useContext(UserContext);
  return (
    <nav css={navStyles}>
      <div id='nav-top'>
        <div css={navSection}>
          <SiteTitle />
        </div>
        {user._id && (
          <>
            {hasPermission(user, [Role.SuperAdmin, Role.Student]) && (
              <div css={navSection}>
                <NavStudentDashboard />
              </div>
            )}
            {hasPermission(user, [Role.Admin, Role.SuperAdmin, Role.Teacher]) && (
              <>
                <div css={navSection}>
                  <NavStudentProgress />
                </div>
                <div css={navSection}>
                  <NavManageDashboard />
                </div>
              </>
            )}
          </>
        )}
      </div>
      <div css={lower}>
        <div css={css`display: flex;align-items: center;`}>
          <img
            src={user.picture}
            title={user.email}
            css={css`
              width: 45px;
              border-radius:45px;
              margin-right: 1rem;    
          `}></img>
          <Logout />
        </div>

        <Link href='/privacy'>
          <small css={css`color: var(--blueMedium);padding:0.25rem;`}>Privacy Policy</small>
        </Link>
      </div>
    </nav>
  );
};

export default NavPanel;