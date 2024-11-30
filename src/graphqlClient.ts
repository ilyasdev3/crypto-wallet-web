// src/apolloClient.ts
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("walletToken");

  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    },
  };
});

// Create Apollo Client instance
export const createApolloClient = () => {
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: "network-only",
      },
      watchQuery: {
        fetchPolicy: "network-only",
      },
    },
  });
};

let apolloClient = createApolloClient();

// Function to reset the client
export const resetApolloClient = () => {
  apolloClient = createApolloClient();
  return apolloClient;
};

export default apolloClient;
