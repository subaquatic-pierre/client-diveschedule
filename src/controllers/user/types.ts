import { SetState } from "../index";
import { Profile, User } from "../../@types/user";
import { LoadingState } from "../../hooks/useFetchStatus";

export type UserController = {
  getUserList: (setState: SetState<LoadingState<User[]>>) => void;
  getUserProfile: (
    userId: string,
    setState: SetState<LoadingState<Profile>>
  ) => void;
  deleteUsers: (
    usersIds: string[],
    setState: SetState<LoadingState<User[]>>
  ) => void;
};

export type UserEdge = {
  __typename: "UserEdge";
  node: User;
};

export type UserConnection = {
  __typename: "UserConnection";
  edges: UserEdge[];
};
