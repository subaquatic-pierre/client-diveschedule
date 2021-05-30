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
  const getUserList = async (setState) => {
    setState({ loading: true, data: [], error: null });
    try {
      const { data } = await client.query({
        query: USER_LIST_QUERY,
        fetchPolicy: "network-only",
      });
      const users: User[] = normalizeUserList(data.allUsers);
      setState({ loading: false, data: users, error: null });
    } catch (err) {
      setState({ loading: false, data: [], error: err.message });
    }
  };

  // Get single user profile
  const getUserProfile = async (userId, setState) => {
    setState({ loading: true, data: null, error: null });
    const { data } = await client.query({
      query: GET_USER_PROFILE,
      variables: { id: parseInt(userId) },
    });
    try {
      setState({ loading: false, data: data.userProfile, error: null });
    } catch (err) {
      setState({ loading: false, data: null, error: err.message });
    }
  };

  // Delete list of users
  const deleteUsers = async (userIds, setState) => {
    const ids = userIds.map((userId) => parseInt(userId));
    const currentUsers = normalizeUserList(
      client.readQuery({ query: USER_LIST_QUERY }).allUsers
    );
    const filteredUsers = filterDeletedUsers(userIds, currentUsers);

    try {
      await client.mutate({
        mutation: DELETE_USERS,
        variables: { ids },
      });
      client.writeQuery({ query: USER_LIST_QUERY, data: filteredUsers });
      getUserList(setState);
      setSuccess(`User${userIds.length > 1 ? "'s" : ""} successfully deleted`);
    } catch (err) {
      setState({ loading: false, data: currentUsers, error: err.message });
    }
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
