// import App from 'next/app'
import { css } from '@emotion/core';

const header = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 50px;
  margin-bottom: 50px;
  background-color: purple;
`;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <header css={header} />
      <div css={css`margin-top: 50px;`}>
      <Component {...pageProps} />
      </div>
    </>
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
