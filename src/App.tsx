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
import LoadingScreen from "./components/LoadingScreen";
import GoogleAnalytics from "./components/GoogleAnalytics";
import NotistackProvider from "./components/NotistackProvider";

import AuthProvider from "./components/authentication/AuthProvider";
import useApolloSetup from "./hooks/useApolloSetup";

// ----------------------------------------------------------------------

const history = createBrowserHistory();

const App: React.FC = (props) => {
  const client = useApolloSetup();

  if (!client) {
    return <LoadingScreen />;
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
                      <Settings />
                      <ScrollToTop />
                      <GoogleAnalytics />
                      {renderRoutes(routes)}
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
