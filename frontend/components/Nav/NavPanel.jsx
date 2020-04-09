import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import NavStudent from './NavStudent';
import NavTeacher from './NavTeacher';
import SiteTitle from './SiteTitle';
import Login from './Login';
import Logout from './Logout';

const navStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
        <NavSection>
          <NavStudent />
        </NavSection>
        <NavSection>
          <NavTeacher />
        </NavSection>
      </div>
      <div id='nav-bottom'>
        <UserSection>
          {(currentUser === null) ? <Login /> : <Logout />}
        </UserSection>
      </div>
    </nav>
  );
};

export default NavPanel;