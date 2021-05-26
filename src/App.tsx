import React from "react";
import { createBrowserHistory } from "history";
import { HelmetProvider } from "react-helmet-async";

// material
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import { Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

// Routes
import routes, { renderRoutes } from "./routes";

// Theme
import ThemeConfig from "./theme";

// Components
import SetupCache from "./components/SetupCache";
import Settings from "./components/settings";
import RtlLayout from "./components/RtlLayout";
import ScrollToTop from "./components/ScrollToTop";
import GoogleAnalytics from "./components/GoogleAnalytics";
import NotistackProvider from "./components/NotistackProvider";

import AuthProvider from "./components/authentication/AuthProvider";
import useApolloSetup from "./hooks/useApolloSetup";
import BaseLoading from "./components/BaseLoading";
import LoadingProvider from "./components/LoadingProvider";

// ----------------------------------------------------------------------

const history = createBrowserHistory();

const App: React.FC = (props) => {
  const client = useApolloSetup();

  if (!client) {
    return <BaseLoading />;
  }

  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <SetupCache>
          <ThemeConfig>
            <RtlLayout>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <NotistackProvider>
                  <Router history={history}>
                    <AuthProvider>
                      <LoadingProvider>
                        <Settings />
                        <ScrollToTop />
                        <GoogleAnalytics />
                        {renderRoutes(routes)}
                      </LoadingProvider>
                    </AuthProvider>
                  </Router>
                </NotistackProvider>
              </LocalizationProvider>
            </RtlLayout>
          </ThemeConfig>
        </SetupCache>
      </HelmetProvider>
    </ApolloProvider>
  );
};

export default App;
