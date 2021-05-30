import { ApolloClient } from "@apollo/client";
import { Profile, User } from "../../@types/user";
import { UserController } from "./types";
import { messagesController } from "../messages";
import { GET_USER_PROFILE, USER_LIST_QUERY, DELETE_USERS } from "./queries";
import { normalizeUserList, filterDeletedUsers } from "./utils";

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
  const { setSuccess } = messagesController(client);

  // Get all users for admin list view
  const getUserList = (setState): void => {
    setState({ loading: true, data: [], error: null });
    client
      .query({ query: USER_LIST_QUERY, fetchPolicy: "network-only" })
      .then((res) => {
        const users: User[] = normalizeUserList(res.data.allUsers);
        setState({ loading: false, data: users, error: null });
      })
      .catch((err) => {
        setState({ loading: false, data: [], error: err.message });
      });
  };

  // Get single user profile
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

  // Delete list of users
  const deleteUsers = (userIds, setState): void => {
    const ids = userIds.map((userId) => parseInt(userId));

    const optimisticResponse = {
      loading: false,
      data: filterDeletedUsers(
        userIds,
        normalizeUserList(
          client.readQuery({ query: USER_LIST_QUERY }).data.allUsers
        )
      ),
      error: null,
    };
    setState(optimisticResponse);

    client
      .mutate({
        mutation: DELETE_USERS,
        variables: { ids },
      })
      .then((res) => {
        setSuccess("Users successfully deleted");
      })
      .catch((err) => {
        setState({ loading: false, data: [], error: err.message });
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
