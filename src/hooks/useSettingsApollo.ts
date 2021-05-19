import {
  useApolloClient,
  gql,
  useQuery,
  ApolloClient,
  DocumentNode,
} from "@apollo/client";

// ----------------------------------------------------------------------

type ThemeMode = "light" | "dark";
type ThemeDirection = "rtl" | "ltr";

type SettingsQueryType = {
  settings: {
    themeMode: ThemeMode;
    themeDirection: ThemeDirection;
  };
};

export const SETTINGS_QUERY = gql`
  query Settings {
    settings {
      themeMode
      themeDirection
    }
  }
`;

function updateClient(
  client: ApolloClient<any>,
  query: DocumentNode,
  data: any
): void {
  client.writeQuery({
    query,
    data,
  });
}

function useSettings() {
  const client = useApolloClient();
  const { data, error } = useQuery<SettingsQueryType>(SETTINGS_QUERY);

  if (error) {
    throw new Error(`There was an error with settings query: ${error.message}`);
  }

  const { settings } = data;
  const { themeMode, themeDirection } = settings;

  const isLight = themeMode === "light";

  const handleToggleTheme = () => {
    const data = {
      settings: {
        ...settings,
        themeMode: isLight ? "dark" : "light",
      },
    };
    updateClient(client, SETTINGS_QUERY, data);
  };

  const handleChangeTheme = (event) => {
    const data = {
      settings: {
        ...settings,
        themeMode: event.target.value,
      },
    };
    updateClient(client, SETTINGS_QUERY, data);
  };

  const handleChangeDirection = (event) => {
    const data = {
      settings: {
        ...settings,
        themeDirection: event.target.value,
      },
    };
    updateClient(client, SETTINGS_QUERY, data);
  };

  return {
    // Mode
    themeMode,
    toggleMode: handleToggleTheme,
    selectMode: handleChangeTheme,
    // Direction
    themeDirection,
    selectDirection: handleChangeDirection,
  };
}

export default useSettings;
