import { ApolloClient, DocumentNode } from "@apollo/client";
import { Profile, User } from "../@types/user";
import { UserController } from "./controllers";

export const defaultProfile: Profile = {
  fullName: "",
  certificationLevel: "",
  equipment: "",
  phoneNumber: "",
  role: null,
};

export const defaultUser: User = {
  id: "AnonymousUser",
  email: "",
  isAdmin: true,
  profile: defaultProfile,
};

export const userController = (
  client: ApolloClient<any>,
  mutation?: DocumentNode,
  data?: User[]
): UserController => {
  const getUserList = (): User[] => {
    return [];
  };

  const getUser = (id: string): User => {
    console.log(id);
    return defaultUser;
  };

  return {
    userList: getUserList(),
    getUser,
    getUserList,
  };
};

const getUserList = () => {};
const getUsers = () => {};
const getCards = () => {};
const getProfile = () => {};
const getInvoices = () => {};
const getAddressBook = () => {};
const getNotifications = () => {};
const getPosts = () => {};
const getGallery = () => {};
const getFriends = () => {};
const getFollowers = () => {};
const onToggleFollow = (followerId: string) => {};

export {
  getUsers,
  getUserList,
  getCards,
  getInvoices,
  getAddressBook,
  getNotifications,
  getPosts,
  getGallery,
  getFriends,
  getProfile,
  getFollowers,
  onToggleFollow,
};
