import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'emotion-theming';
import { Global, css } from '@emotion/core';
import { withApollo } from '../lib/withApollo';

// Styles
import global from '../styles/global';
import { theme } from '../styles/theme';

// Components
import NavPanel from '../components/Nav/NavPanel';
import Alert from '../components/Alert';
import { UserProvider } from '../components/context/UserContext';
import { AlertProvider } from '../components/context/AlertContext';

const layout = css`
  height: 100vh;
  max-width: 100vw;
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  grid-template-areas:
    "nav main";
  overflow: hidden;

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
  h1, h2, h2, h3, h4, h5 {
    color: var(--blueDark);
  }
}
`

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <AlertProvider>
          <Global styles={global} />
          <Head>
            <script src="https://apis.google.com/js/platform.js" async defer></script>
          </Head>
          <div css={layout}>
            <NavPanel />
            <main>
              <Component {...pageProps} />
              <Alert />
            </main>
          </div>
        </AlertProvider>
      </UserProvider>
    </ThemeProvider>
  )
}

export default withApollo(MyApp)