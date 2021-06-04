import { RegisterParams, LoginParams } from "./auth";

export type MessagesController = {
  setError: (message: string) => void;
  clearError: () => void;
  setSuccess: (message: string) => void;
  clearSuccess: () => void;
};

export type SettingsController = {
  handleToggleTheme: () => void;
  handleChangeTheme: (event: any) => void;
  handleChangeDirection: (event: any) => void;
};

export type AuthController = {
  login: ({ email, password }: LoginParams, history: any) => void;
  register: ({ email, password, firstName, lastName }: RegisterParams) => void;
  logout: (history: any) => void;
  resetPassword: (data: any) => void;
};
