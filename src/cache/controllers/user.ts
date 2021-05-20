import {
  Friend,
  Gallery,
  Profile,
  UserPost,
  Follower,
  UserData,
  CreditCard,
  UserInvoice,
  UserManager,
  UserAddressBook,
  NotificationSettings,
} from "../../@types/user";

export type UserCache = {
  user: {
    userName: String;
  };
};

type UserState = {
  isLoading: boolean;
  error: boolean;
  myProfile: null | Profile;
  posts: UserPost[];
  users: UserData[];
  userList: UserManager[];
  followers: Follower[];
  friends: Friend[];
  gallery: Gallery[];
  cards: CreditCard[] | null;
  addressBook: UserAddressBook[];
  invoices: UserInvoice[];
  notifications: NotificationSettings | null;
};

export const initialState: UserState = {
  isLoading: false,
  error: false,
  myProfile: null,
  posts: [],
  users: [],
  userList: [],
  followers: [],
  friends: [],
  gallery: [],
  cards: null,
  addressBook: [],
  invoices: [],
  notifications: null,
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
