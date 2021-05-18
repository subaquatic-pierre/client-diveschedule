import { SettingsState } from "../../@types/settings";
import { ReducerAction } from "../../@types/reducers";

// ----------------------------------------------------------------------

function reducer(state: SettingsState, action: ReducerAction) {
  switch (action.type) {
    case "switchMode":
      return {
        ...state,
        themeMode: action.payload,
      };
    case "switchDirection":
      return {
        ...state,
        themeDirection: action.payload,
      };
    default:
      throw new Error();
  }
}

export default reducer;
