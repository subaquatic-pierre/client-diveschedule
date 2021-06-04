import { SetState } from "../index";
import { Profile, User, CreateUserParams } from "../../@types/user";
import { LoadingState } from "../../hooks/useFetchStatus";

export interface IUserControls {
  getUserList: (setState: SetState<LoadingState<User[]>>) => void;

  getUserProfile: (
    userId: string,
    setState: SetState<LoadingState<Profile>>
  ) => void;

  deleteUsers: (
    usersIds: string[],
    setState: SetState<LoadingState<User[]>>,
    userList: User[]
  ) => void;

  createUser: (
    params: CreateUserParams,
    setState: SetState<LoadingState<any>>
  ) => void;

  updateProfile: (
    params: CreateUserParams,
    setState: SetState<LoadingState<any>>
  ) => void;
}

export type UserEdge = {
  __typename: "UserEdge";
  node: User;
};

export type UserConnection = {
  __typename: "UserConnection";
  edges: UserEdge[];
};
