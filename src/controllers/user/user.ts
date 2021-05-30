import { Profile, User } from "../../@types/user";
import { IUserControls } from "./types";
import { GET_USER_PROFILE, USER_LIST_QUERY, DELETE_USERS } from "./queries";
import { normalizeUserList, filterDeletedUsers } from "./utils";
import { CREATE_USER, UPDATE_PROFILE } from "./queries";
import { BaseController } from "..";

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

export class UserController extends BaseController {
  // Get user list
  getUserList = async (setState) => {
    setState({ loading: true, data: [], error: null });

    const { data, error } = await this._performApolloRequest({
      query: USER_LIST_QUERY,
      fetchPolicy: "network-only",
    });

    if (data) {
      const users: User[] = normalizeUserList(data.allUsers);
      setState({ loading: false, data: users, error: null });
    } else if (error) {
      setState({ loading: false, data: [], error: error.message });
    }
  };

  // Get single user profile
  getUserProfile = async (userId, setState) => {
    setState({ loading: true, data: null, error: null });

    const { data, error } = await this._performApolloRequest({
      query: GET_USER_PROFILE,
      variables: { id: parseInt(userId) },
    });

    if (data) {
      setState({ loading: false, data: data.userProfile, error: null });
    } else if (error) {
      setState({ loading: false, data: null, error: error.message });
    }
  };

  // Delete list of users
  deleteUsers = async (userIds, setState, userList) => {
    const ids = userIds.map((userId) => parseInt(userId));
    const filteredUsers = filterDeletedUsers(userIds, userList);
    setState({ loading: true, data: filteredUsers, error: null });

    const { data, error } = await this._performApolloRequest({
      mutation: DELETE_USERS,
      variables: { ids },
    });

    if (data) {
      setState({ loading: false, data: filteredUsers, error: null });
      this.setSuccess(
        `User${userIds.length > 1 ? "'s" : ""} successfully deleted`
      );
    } else if (error) {
      setState({ loading: false, data: userList, error: error.message });
      this.setError(error.message);
    }
  };

  // Create new user from dashboard
  createUser = async (variables, setState) => {
    console.log(variables);
    const { data, error } = await this._performApolloRequest({
      mutation: CREATE_USER,
      variables,
    });
    if (data) {
      console.log(data);
      // setState({ data });
    } else if (error) {
      console.log(error);
    }
  };

  // Create new user from dashboard
  updateProfile = async (variables, setState) => {
    console.log(variables);
    const { data, error } = await this._performApolloRequest({
      mutation: UPDATE_PROFILE,
      variables,
    });
    if (data) {
      console.log(data);
      // setState({ data });
    } else if (error) {
      console.log(error);
    }
  };

  public static getControls(client): IUserControls {
    const controller = new UserController(client);
    return {
      createUser: controller.createUser,
      getUserList: controller.getUserList,
      getUserProfile: controller.getUserProfile,
      deleteUsers: controller.deleteUsers,
      updateProfile: controller.updateProfile,
    };
  }
}
