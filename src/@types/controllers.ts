import { Dispatch, SetStateAction } from "react";
import { LoginParams, RegisterParams } from "./user";
import { User } from "./user";

interface SetState<TData> extends Dispatch<SetStateAction<TData | undefined>> {}

export type SettingsController = {
  handleToggleTheme: () => void;
  handleChangeTheme: (event: any) => void;
  handleChangeDirection: (event: any) => void;
};

export type AuthController = {
  login: ({ email, password }: LoginParams) => void;
  register: ({ email, password, firstName, lastName }: RegisterParams) => void;
  logout: () => void;
  resetPassword: (data: any) => void;
};

export type UserController = {
  getUserList: (setState: SetState<any>) => void;
  getUser: (id: string, setState: SetState<any>) => void;
  userList: User[];
};

export type ErrorController = {
  setError: (message: string) => void;
  clearError: () => void;
};
