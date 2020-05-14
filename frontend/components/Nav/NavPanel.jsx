import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import NavStudent from './NavStudent';
import NavCurriculumDashboard from './NavCurriculumDashboard';
import NavStudentProgress from './NavStudentProgress';
import SiteTitle from './SiteTitle';
import Login from './Login';
import Logout from './Logout';

const navStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;
`;

const NavSection = styled.section`
  width: 100%;
  border-bottom: 1px solid var(--blueLight);
  padding: 1rem 0rem;
`;

const UserSection = styled.section`
  border-top: 1px solid var(--blueLight);
  padding: 1rem 1rem;
  display: flex;
  justify-content: space-evenly;
`;

const NavPanel = ({ setIsLogin, currentUser }) => {

  return (
    <nav css={navStyles}>
      <div id='nav-top'>
        <NavSection>
          <SiteTitle />
        </NavSection>
        {currentUser && (
          <>
            <NavSection>
              <NavStudent />
            </NavSection>
            <NavSection>
              <NavStudentProgress />
            </NavSection>
            <NavSection>
              <NavCurriculumDashboard />
            </NavSection>
          </>
        )}
      </div>
      <div id='nav-bottom'>
        <UserSection>
          {(currentUser === null) ? <Login disabled={false} /> :
            (
              <>
                <Login disabled={true} css={css`display: none;`} />
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