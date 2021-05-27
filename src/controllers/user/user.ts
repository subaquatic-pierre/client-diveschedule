import { ApolloClient } from "@apollo/client";
import { Profile, User } from "../../@types/user";
import { UserController } from "./types";
import { messagesController } from "../messages";
import { GET_USER_QUERY, USER_LIST_QUERY } from "./queries";

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
  isAdmin: false,
  profile: defaultProfile,
};

export const userController = (client: ApolloClient<any>): UserController => {
  const { setError } = messagesController(client);
  const getUserList = (setState): void => {
    client
      .query({ query: USER_LIST_QUERY })
      .then((res) => {
        const users: User[] = res.data.allUsers.edges.map((edge) => edge.node);
        setState(users);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const getUser = (id: string, setState: any): void => {
    setState({ loading: true, data: null, error: null });
    client
      .query({
        query: GET_USER_QUERY,
        variables: { id: parseInt(id) },
      })
      .then((res) => {
        setState({ loading: false, data: res.data.user, error: null });
      })
      .catch((err) => {
        setState({ loading: false, data: null, error: err.message });
        setError(err.message);
      });
  };

  return {
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
