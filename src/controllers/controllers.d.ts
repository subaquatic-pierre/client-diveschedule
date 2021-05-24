import { LoginParams, RegisterParams } from "./auth";

export type SettingsController = {
  handleToggleTheme: () => void;
  handleChangeTheme: (event: any) => void;
  handleChangeDirection: (event: any) => void;
};

export type AuthController = {
  login: ({ email, password }: LoginParams) => Promise;
  register: ({
    email,
    password,
    firstName,
    lastName,
  }: RegisterParams) => Promise;
  logout: () => Promise;
  resetPassword: (data: any) => void;
  updateProfile: (data: any) => void;
};
