import { Profile, UserData, UserManager } from "../@types/user";

import { fetchProfile } from "../_apis_/user";

export type UserCache = {
  user: {
    userName: String;
  };
};

type UserState = {
  isLoading: boolean;
  error: boolean;
  myProfile: null | Profile;
  posts: [];
  users: UserData[];
  userList: UserManager[];
  followers: [];
  friends: [];
  gallery: [];
  cards: [] | null;
  addressBook: [];
  invoices: [];
  notifications: [] | null;
};

export const initialState: UserState = {
  isLoading: false,
  error: false,
  myProfile: fetchProfile(),
  posts: [],
  users: [],
  userList: [],
  followers: [],
  friends: [],
  gallery: [],
  cards: [],
  addressBook: [],
  invoices: [],
  notifications: [],
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
