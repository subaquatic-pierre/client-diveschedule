import { ApolloClient } from "@apollo/client";
import { Profile, User } from "../../@types/user";
import { UserController } from "./types";
import { messagesController } from "../messages";
import { GET_USER_PROFILE, USER_LIST_QUERY } from "./queries";

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
  const { setError, setSuccess } = messagesController(client);
  const getUserList = (setState): void => {
    setState({ loading: true, data: [], error: null });
    client
      .query({ query: USER_LIST_QUERY })
      .then((res) => {
        const users: User[] = res.data.allUsers.edges.map((edge) => edge.node);
        setState({ loading: false, data: users, error: null });
      })
      .catch((err) => {
        setState({ loading: false, data: null, error: err.message });
      });
  };

  const getUserProfile = (userId, setState): void => {
    setState({ loading: true, data: null, error: null });
    client
      .query({
        query: GET_USER_PROFILE,
        variables: { id: parseInt(userId) },
      })
      .then((res) => {
        setState({ loading: false, data: res.data.userProfile, error: null });
      })
      .catch((err) => {
        setState({ loading: false, data: null, error: err.message });
      });
  };

  const deleteUsers = (userId): void => {
    client
      .query({
        query: GET_USER_PROFILE,
        variables: { id: parseInt(userId) },
      })
      .then((res) => {
        window.location.reload();
        setSuccess("Users successfully deleted");
      })
      .catch((err) => {
        setError(`Unable to delete users: ${err.message}`);
      });
  };

  return {
    deleteUsers,
    getUserProfile,
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
