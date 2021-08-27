import { useMemo } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  NormalizedCacheObject,
} from '@apollo/client';
import { getLocalState, setLocalState } from './localStorage';
import fetch from 'isomorphic-unfetch';
import { TOKEN_KEY } from './constants';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

function createIsomorphLink() {

  const enhancedFetch = (input: RequestInfo, init?: RequestInit) => {
    const token = getLocalState(TOKEN_KEY, false);
    return fetch(input, {
      ...init,
      headers: { // token이 있는 경우에만 header에 Bearer 추가
        ...(init?.headers ? init.headers : {}),
        authorization: `Bearer ${token}`,
      },
    }).then(response => response);
  };

  // 요청 시 스토리지에서 토큰 구해서 bearer 헤더로 전달
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT, // Server URL (must be absolute)
    credentials: 'include', // `'same-origin', // Additional fetch() options like `credentials` or `headers`
    fetch: enhancedFetch,
  });

  // 응답에서 토큰 구해서 스토리지에 저장
  const authAfterWare = new ApolloLink((operation, forward) => {
    if (!forward) { return null; }
  
    return forward(operation).map((response) => {
      const context = operation.getContext();
      const token = context.response.headers.get('vendure-auth-token');
      setLocalState(TOKEN_KEY, token, false);
      return response;
    });
  });


  return ApolloLink.from([authAfterWare, httpLink]);
}

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphLink(),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            // Reusable helper function to generate a field
            // policy for the Query.products field.
            products: {
              keyArgs: ['type', 'category', 'text'],
              merge(existing, incoming) {
                const { items: newItems } = incoming;
                return existing
                  ? {
                      ...incoming,
                      items: [...existing.items, ...newItems],
                    }
                  : incoming;
              },
            },
          },
        },
      },
    }),

  });
}

export function initializeApollo(initialState: any = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
