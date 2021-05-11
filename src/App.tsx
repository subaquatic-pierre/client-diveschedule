import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Color } from "@material-ui/lab/Alert";
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
import Cookies from "js-cookie";
import { getApiUri } from "./utils";

interface IAlert {
  state: boolean;
  severity: Color | undefined;
  message: string | undefined;
}

interface IAlertContext {
  alert: IAlert;
  setAlert: React.Dispatch<React.SetStateAction<IAlert>>;
}

export const AlertContext = React.createContext({} as IAlertContext);

// Authorization logic
const token = getAuthToken();

const httpLink = new HttpLink({
  uri: getApiUri(),
  headers: {
    Authorization: token ? `JWT ${token}` : "",
    "X-CSRFToken": Cookies.get("csrftoken"),
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

export const initialAlert: IAlert = {
  state: false,
  severity: undefined,
  message: undefined,
};

const App: React.FC = (props) => {
  const [alert, setAlert] = React.useState(initialAlert);
  return (
    <ApolloProvider client={client}>
      <Router>
        <Auth token={token}>
          <AlertContext.Provider value={{ alert, setAlert }}>
            <Layout>
              <BaseRouter />
            </Layout>
          </AlertContext.Provider>
        </Auth>
      </Router>
    </ApolloProvider>
  );
};

export default App;
