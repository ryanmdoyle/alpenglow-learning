import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import NavStudent from './NavStudentDashboard';
import NavManageDashboard from './NavManageDashboard';
import NavStudentProgress from './NavStudentProgress';
import SiteTitle from './SiteTitle';
import Login from './Login';
import Logout from './Logout';
import Loading from '../Loading';
import UserContext from '../context/UserContext';
import NavStudentDashboard from './NavStudentDashboard';
import hasPermission from '../../lib/hasPermission';
import { Roles } from '../../lib/enums';

const navStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;
`;

const NavSection = styled.section`
  width: 100%;
  padding: 1rem 0 0.25rem 0;
`;

const UserSection = styled.section`
  border-top: 1px solid var(--blueLight);
  padding: 1rem 1rem;
  display: flex;
  justify-content: space-evenly;
`;

const NavPanel = () => {
  const user = useContext(UserContext);
  return (
    <nav css={navStyles}>
      <div id='nav-top'>
        <NavSection>
          <SiteTitle />
        </NavSection>
        {user && (
          <>
            {hasPermission(user, [Roles.SuperAdmin, Roles.Student]) && (
              <NavSection>
                <NavStudentDashboard />
              </NavSection>
            )}
            {hasPermission(user, [Roles.Admin, Roles.SuperAdmin]) && (
              <>
                <NavSection>
                  <NavStudentProgress />
                </NavSection>
                <NavSection>
                  <NavManageDashboard />
                </NavSection>
              </>
            )}
          </>
        )}
      </div>
      <div id='nav-bottom'>
        <UserSection>
          {(!user) ? <Login disabled={false} /> :
            (
              <>
                <Login disabled={true} />
                <Logout />
              </>
            )
          }
        </UserSection>
      </div>
    </nav>
  );
};

export default NavPanel;