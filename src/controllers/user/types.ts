import { SetState } from "../index";
import { User } from "../../@types/user";

export type UserController = {
  getUserList: (setState: SetState<any>) => void;
  getUserProfile: (id: string, setState: SetState<any>) => void;
};
