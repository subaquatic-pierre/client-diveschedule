import { User } from "../../@types/user";
import { UserConnection } from "./types";

export const normalizeUserList = (allUsers: UserConnection): User[] => {
  console.log(allUsers);
  return allUsers.edges.map((edge) => edge.node);
};

export const filterDeletedUsers = (
  userIds: string[],
  users: User[]
): User[] => {
  const filteredUsers = [...users];
  for (let id of userIds) {
    const indexOf = users.findIndex((el) => el.id === id);
    filteredUsers.splice(indexOf, 1);
  }
  return filteredUsers;
};
