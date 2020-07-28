import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'emotion-theming';
import { Global, css } from '@emotion/core';
import { withApollo } from '../lib/withApollo';

// Styles
import global from '../styles/global';
import { theme } from '../styles/theme';

// Components
import LayoutController from '../components/styled/blocks/LayoutController';
import { UserProvider } from '../components/context/UserContext';
import { AlertProvider } from '../components/context/AlertContext';
import { ModalProvider } from '../components/context/ModalContext';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <AlertProvider>
          <ModalProvider>
            <Global styles={global} />
            <Head>
              <link rel="icon" href="/alpenglow.svg"></link>
            </Head>
            <LayoutController Component={Component} pageProps={pageProps} />
          </ModalProvider>
        </AlertProvider>
      </UserProvider>
    </ThemeProvider>
  )
}

export default withApollo(MyApp)