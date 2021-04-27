import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { getAuthToken } from "./components/Auth/utils";
import { Auth } from "./components/Auth";

import { BaseRouter } from "./routes";
import { Layout } from "./components/Layout/Layout";

// Get app config from env file
require("dotenv").config();

// Authorization logic
const token = getAuthToken();

const httpLink = new HttpLink({
  uri: "http://localhost:8000/graphql/",
  credentials: "include",
  headers: {
    Authorization: token ? `JWT ${token}` : "",
  },
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
  link: httpLink,
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
