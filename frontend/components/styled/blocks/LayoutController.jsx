import React, { useContext, useState } from 'react';
import { css } from '@emotion/core';

import NavPanel from '../../Nav/NavPanel';
import Alert from '../../Alert';
import Modal from '../../Modal'
import ComponentWithRouteProtection from '../../ComponentWithRouteProtection';
import UserContext from '../../context/UserContext';
import Login from '../../Nav/Login';
import TextButton from '../elements/TextButton';
import { Role } from '../../../lib/enums';


const dashboard = css`
  height: 100vh;
  max-width: 100vw;
  display: grid;
  grid-template-columns: var(--navWidth) 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  grid-template-areas:
    "nav main";
  overflow: hidden;
  scrollbar-width: thin;
  scrollbar-color: var(--scrollbar) var(--scrollbarBG);

    nav {
      grid-area: nav;
      border-right: 1px solid var(--grey);
      height: 100vh;
      box-shadow: var(--shadowMedium);
      background-color: var(--blueDark);
    }

    main {
      position: relative;
      grid-area: main;
      height: 100vh;
      width: 100%;
      overflow-y: scroll;
    }
`;

const landing = css`
  height: 100vh;
  max-width: 100vw;
  nav {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    height: 120px;
    padding: 0 1rem;
    background-color: var(--blueDark);
    display: flex;
    align-content: center;
    .content-container {
      width: 100%;
      max-width: 1000px;
      margin: auto;
      display: flex;
      align-items: center;
      h2 {
        margin: 0;
        color: var(--pink);
        flex-grow: 1;
      }
      img {
        padding:0 1rem;
      }
    }
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 1000px;
    margin: auto;
    padding: calc(120px + 2rem) 2rem 2rem 3rem;
    h1, h3 {
      text-align: center;
    }
    .buttons {
      width: 500px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
`;

const LayoutController = ({ Component, pageProps }) => {
  const user = useContext(UserContext);
  const [signupRole, setSignupRole] = useState(null);

  // Renders a different layout based on user being logged in or out

  if (!user) return (
    <div css={landing}>
      <nav>
        <div className='content-container'>
          <img src='/alpenglow.svg' height='80px'></img>
          <h2>Alpenglow Learning</h2>
          <Login css={css`justify-self: flex-end;`} />
        </div>
      </nav>
      <main>
        <ComponentWithRouteProtection Component={Component} pageProps={pageProps} />
      </main>
    </div>
  )

  return (
    <div css={dashboard}>
      <NavPanel />
      <main>
        <ComponentWithRouteProtection Component={Component} pageProps={pageProps} />
        <Alert />
        <Modal />
      </main>
    </div>
  );
};

export default LayoutController;