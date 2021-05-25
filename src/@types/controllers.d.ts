import { LoginParams, RegisterParams } from "../controllers/auth/auth";
import { User } from "../controllers/user";

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
  getUser: (id: string) => User;
  userList: User[];
};
