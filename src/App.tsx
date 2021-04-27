import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  from,
} from "@apollo/client";
import { getAuthToken } from "./components/Auth/utils";
import { Auth } from "./components/Auth";

import { BaseRouter } from "./routes";
import { Layout } from "./components/Layout/Layout";

import { getApiUri } from "./utils";
import { csrfMiddleware, authMiddleware } from "./middleware";

// Authorization logic
const token = getAuthToken();
const httpLink = new HttpLink({
  uri: getApiUri(),
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        bookings: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  link: from([csrfMiddleware, authMiddleware, httpLink]),
  cache,
});

const App: React.FC = (props) => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Auth token={token}>
          <Layout>
            <BaseRouter />
          </Layout>
        </Auth>
      </Router>
    </ApolloProvider>
  );
};

export default App;
