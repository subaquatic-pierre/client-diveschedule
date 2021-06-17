import React, { useEffect } from "react";
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
import AOS from "aos";
import "aos/dist/aos.css";

// Components
import SetupCache from "./components/SetupCache";
import Settings from "./components/settings";
import RtlLayout from "./components/RtlLayout";
import ScrollToTop from "./components/ScrollToTop";
import GoogleAnalytics from "./components/GoogleAnalytics";
import NotistackProvider from "./components/NotistackProvider";

import useApolloSetup from "./hooks/useApolloSetup";
import BaseLoading from "./components/BaseLoading";
import Messages from "./components/Messages";

// ----------------------------------------------------------------------

const history = createBrowserHistory();

const App: React.FC = (props) => {
  const client = useApolloSetup();

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  });

  if (!client) {
    return <BaseLoading />;
  }

  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <SetupCache />
        <ThemeConfig>
          <RtlLayout>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <NotistackProvider>
                <Router history={history}>
                  <Messages />
                  <Settings />
                  <ScrollToTop />
                  <GoogleAnalytics />
                  {renderRoutes(routes)}
                </Router>
              </NotistackProvider>
            </LocalizationProvider>
          </RtlLayout>
        </ThemeConfig>
      </HelmetProvider>
    </ApolloProvider>
  );
};

export default App;
