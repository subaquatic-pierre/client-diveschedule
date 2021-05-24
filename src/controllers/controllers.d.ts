import { LoginParams, RegisterParams } from "./auth";
import { User } from "./user";

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

export type UserController = {
  getUserList: () => void;
  userList: User[];
};
