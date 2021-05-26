import { ApolloClient, DocumentNode } from "@apollo/client";
import { Profile, User } from "../../@types/user";
import { UserController } from "./types";
import { loadingController } from "../loading";
import { GET_USER_QUERY } from "./queries";

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

export const userController = (
  client: ApolloClient<any>,
  mutation?: DocumentNode,
  data?: User[]
): UserController => {
  const { setError } = loadingController(client);
  const getUserList = (): User[] => {
    return [];
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
