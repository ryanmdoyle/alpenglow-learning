// import App from 'next/app'
import { ThemeProvider } from 'emotion-theming';
import { Global, css } from '@emotion/core';
import Head from 'next/head';

import global from '../styles/global';
import { theme } from '../styles/theme';

import NavStudent from '../components/NavStudent';

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
  grid-area: main;
  height: 100vh;
  width: 100%;
  overflow-y: scroll;
  h1, h2, h2, h3 {
    color: var(--blueDark);
  }
}
`

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={global} />
      <Head>
        <script src="https://apis.google.com/js/platform.js" async defer></script>
      </Head>
      <div css={layout}>
        <nav>
          <NavStudent />
        </nav>
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </ThemeProvider>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp
