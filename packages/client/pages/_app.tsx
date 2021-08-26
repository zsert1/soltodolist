import * as React from 'react'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apollo'



export default function ExtendedApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>  
      <Component {...pageProps} /> 
    </ApolloProvider>
  );
}



