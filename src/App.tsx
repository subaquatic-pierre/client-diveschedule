import React from 'react';
import Cookies from 'js-cookie';
import { createBrowserHistory } from 'history';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

// material
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import { Router } from 'react-router-dom';
import { Color } from '@material-ui/lab/Alert';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from '@apollo/client';

// Redux
import { store, persistor } from './redux/store';

// Routes
import routes, { renderRoutes } from './routes';

// Theme
import ThemeConfig from './theme';

// Components
import Settings from './components/settings';
import RtlLayout from './components/RtlLayout';
import ScrollToTop from './components/ScrollToTop';
import LoadingScreen from './components/LoadingScreen';
import GoogleAnalytics from './components/GoogleAnalytics';
import NotistackProvider from './components/NotistackProvider';

// Using for Auth (Check doc https://minimals.cc/docs/authentication)
import JwtProvider from './components/authentication/JwtProvider';
// import FirebaseProvider from './components/authentication/FirebaseProvider';

// Auth
import { getAuthToken } from './components/Auth/utils';
import { Auth } from './components/Auth';

// Layout
import { Layout } from './components/Layout/Layout';
import { getApiUri } from './utils';

// ----------------------------------------------------------------------

interface IAlert {
  state: boolean;
  severity: Color | undefined;
  message: string | undefined;
}

export interface IAlertContext {
  alert: IAlert;
  setAlert: React.Dispatch<React.SetStateAction<IAlert>>;
}

export const AlertContext = React.createContext({} as IAlertContext);

// Authorization logic
const token = getAuthToken();

const httpLink = new HttpLink({
  uri: getApiUri(),
  headers: {
    Authorization: token ? `JWT ${token}` : '',
    'X-CSRFToken': Cookies.get('csrftoken')
  }
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        bookings: {
          merge(existing, incoming) {
            return incoming;
          }
        }
      }
    }
  }
});

const client = new ApolloClient({
  link: httpLink,
  cache
});

export const initialAlert: IAlert = {
  state: false,
  severity: undefined,
  message: undefined
};

const history = createBrowserHistory();

const App: React.FC = (props) => {
  const [alert, setAlert] = React.useState(initialAlert);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ReduxProvider store={store}>
          <PersistGate loading={<LoadingScreen />} persistor={persistor}>
            <ThemeConfig>
              <RtlLayout>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <NotistackProvider>
                    <Auth token={token}>
                      <AlertContext.Provider value={{ alert, setAlert }}>
                        <Router history={history}>
                          <JwtProvider>
                            <Settings />
                            <ScrollToTop />
                            <GoogleAnalytics />
                            <Layout>{renderRoutes(routes)}</Layout>
                          </JwtProvider>
                        </Router>
                      </AlertContext.Provider>
                    </Auth>
                  </NotistackProvider>
                </LocalizationProvider>
              </RtlLayout>
            </ThemeConfig>
          </PersistGate>
        </ReduxProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
};

export default App;
