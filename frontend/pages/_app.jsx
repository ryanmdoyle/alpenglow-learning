// import App from 'next/app'
import { ThemeProvider } from 'emotion-theming';
import { Global, css } from '@emotion/core';
import Head from 'next/head';
import { withApollo } from '../lib/apollo';
import { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

// For HOC Apollo Component
// import ApolloClient from 'apollo-boost'
// import { ApolloProvider } from '@apollo/react-hooks';
// import { createHttpLink } from 'apollo-link-http';
// import fetch from 'isomorphic-unfetch';

// Styles
import global from '../styles/global';
import { theme } from '../styles/theme';

// Components
import NavPanel from '../components/Nav/NavPanel';
import NavStudent from '../components/Nav/NavStudent';


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
const GET_CURRENT_USER = gql`
    query currentUser {
      currentUser {
        googleId
        firstName
      }
    }
  `;

function MyApp({ Component, pageProps }) {
  // const client = new ApolloClient({
  //   uri: 'http://localhost:4000/graphql',
  //   link: createHttpLink({ uri: '/graphql' }),
  //   fetch: fetch,
  //   credentials: 'include',
  // });
  const { loading, error, data } = useQuery(GET_CURRENT_USER);
  const [isLogin, setIsLogin] = useState(false);

  // sets as null until there is data to pass into the prop (or errors)
  const currentUserData = (data) ? data.currentUser : null;

  return (
    // <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <Global styles={global} />
      <Head>
        <script src="https://apis.google.com/js/platform.js" async defer></script>
      </Head>
      <div css={layout}>
        <NavPanel currentUser={currentUserData} />
        <main>
          <Component {...pageProps} currentUser={currentUserData} />
        </main>
      </div>
    </ThemeProvider>
    // </ApolloProvider>
  )
}

export default withApollo({ ssr: false })(MyApp)