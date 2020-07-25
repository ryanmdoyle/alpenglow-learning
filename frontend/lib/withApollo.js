// From zeit/next.js/examples/withApollo -> https://github.com/zeit/next.js/tree/7bd4f4f3bf7696ab0da666105e2220447e1486ef/examples/with-apollo

import React, { useMemo } from 'react'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost'
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

let apolloClient = null

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
export function withApollo(PageComponent, { ssr = true } = {}) {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = useMemo(
      () => apolloClient || initApolloClient(apolloState),
      []
    )
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    )
  }

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component'

    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.')
    }

    WithApollo.displayName = `withApollo(${displayName})`
  }

  // Allow Next.js to remove getInitialProps from the browser build
  if (typeof window === 'undefined') {
    if (ssr) {
      WithApollo.getInitialProps = async ctx => {
        const { AppTree } = ctx

        let pageProps = {}
        if (PageComponent.getInitialProps) {
          pageProps = await PageComponent.getInitialProps(ctx)
        }

        // Run all GraphQL queries in the component tree
        // and extract the resulting data
        const apolloClient = initApolloClient()

        try {
          // Run all GraphQL queries
          await require('@apollo/react-ssr').getDataFromTree(
            <AppTree
              pageProps={{
                ...pageProps,
                apolloClient
              }}
            />
          )
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          // console.error('Error while running `getDataFromTree`\n', error.graphQLErrors)
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind()

        // Extract query data from the Apollo store
        const apolloState = apolloClient.cache.extract()

        return {
          ...pageProps,
          apolloState
        }
      }
    }
  }

  return WithApollo
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
function initApolloClient(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(initialState)
  }

  return apolloClient
}

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
function createApolloClient(initialState = {}) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  const isBrowser = typeof window !== 'undefined'

  // Create an http link:
  const httpAddress = (process.env.NODE_ENV === 'production') ? '64.227.80.165' : 'localhost:4000';
  const httpLink = new HttpLink({
    uri: `http://${httpAddress}/graphql`, // Server URL
    credentials: 'include', // Additional fetch() options like `credentials` or `headers`
    // Use fetch() polyfill on the server
    fetch: !isBrowser && fetch
  });
  // const wsAddress = (process.env.NODE_ENV === 'production') ? process.env.BACKEND_URL : 'localhost:4000';
  // // Create a WebSocket link:  return null if on server
  // const wsLink = process.browser ? new WebSocketLink({
  //   uri: `ws://${wsAddress}/subscriptions`,
  //   options: {
  //     reconnect: true
  //   }
  // }) : null;

  // using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  // use process.browser return ws only from client when SSR.
  // const link = process.browser ? split(
  //   // split based on operation type
  //   ({ query }) => {
  //     const definition = getMainDefinition(query);
  //     return (
  //       definition.kind === 'OperationDefinition' &&
  //       definition.operation === 'subscription'
  //     );
  //   },
  //   wsLink,
  //   httpLink,
  // ) : httpLink;

  return new ApolloClient({
    connectToDevTools: true, //or isBrowser
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    // link,
    link: httpLink,
    cache: new InMemoryCache().restore(initialState)
  })
}