import { SetState } from "../index";
import { User } from "../../@types/user";
import { LoadingState } from "../../hooks/useFetchStatus";

export type UserController = {
  getUserList: (setState: SetState<LoadingState<User[]>>) => void;
  getUserProfile: (id: string, setState: SetState<any>) => void;
};
