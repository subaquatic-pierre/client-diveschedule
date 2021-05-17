import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// slices
import userReducer from "./slices/user";
import authJwtReducer from "./slices/authJwt";
import settingsReducer from "./slices/settings";
import calendarReducer from "./slices/calendar";

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: ["settings"],
};

const authPersistConfig = {
  key: "authJwt",
  storage,
  keyPrefix: "redux-",
  whitelist: ["isAuthenticated"],
};

const rootReducer = combineReducers({
  user: userReducer,
  settings: settingsReducer,
  calendar: calendarReducer,
  authJwt: persistReducer(authPersistConfig, authJwtReducer),
});

export { rootPersistConfig, rootReducer };
