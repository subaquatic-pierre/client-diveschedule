import { filter } from "lodash";
import { User } from "../@types/user";

export const descendingComparator = (a: User, b: User, orderBy: string) => {
  const second = b.profile.fullName;
  const first = a.profile.fullName;
  if (second < first) {
    return -1;
  }
  if (second > first) {
    return 1;
  }
  return 0;
};

export const getComparator = (order: string, orderBy: string) => {
  return order === "desc"
    ? (a: User, b: User) => descendingComparator(a, b, orderBy)
    : (a: User, b: User) => -descendingComparator(a, b, orderBy);
};

export const applySortFilter = (
  array: User[],
  comparator: (a: any, b: any) => number,
  query: string
) => {
  const stabilizedThis = array.map((el, index) => [el, index] as const);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) =>
        _user.profile.fullName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
};

export const getUsersFromIds = (userIds: string[], users: User[]): User[] => {
  const filteredUsers: User[] = [];
  userIds.forEach((id) => {
    users.forEach((user) => {
      if (user.id === id) {
        filteredUsers.push(user);
      }
    });
  });
  return filteredUsers;
};
