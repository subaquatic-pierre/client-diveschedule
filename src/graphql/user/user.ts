import { Profile, User } from "../../@types/user";
import { IUserControls } from "./types";
import {
  GET_USER_PROFILE,
  USER_LIST_QUERY,
  DELETE_USERS,
  CREATE_USER,
  UPDATE_PROFILE,
} from "./queries";
import { normalizeUserList, filterDeletedUsers } from "./utils";
import { BaseController } from "..";
import { PATH_DASHBOARD } from "../../routes/paths";

export const defaultProfile: Profile = {
  fullName: "",
  certLevel: "",
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
    const { data, error } = await this._performApolloRequest({
      query: USER_LIST_QUERY,
      fetchPolicy: "network-only",
    });

    if (data) {
      const users: User[] = normalizeUserList(data.allUsers);
      setState({ loading: false, data: users, error: null });
    } else if (error) {
      setState({ loading: false, data: [], error: error.message });
      this.setError(error.message);
    }
  };

  // Get single user profile
  getUserProfile = async (userId, setState) => {
    const { data, error } = await this._performApolloRequest({
      query: GET_USER_PROFILE,
      variables: { id: parseInt(userId) },
      fetchPolicy: "network-only",
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
    const { data, error } = await this._performApolloRequest({
      mutation: CREATE_USER,
      variables,
    });
    if (data) {
      const userId = data.createUser.user.id;
      setState({
        loading: false,
        data: data.createUser.user.profile,
        error: null,
      });
      this.setSuccess("User successfully created");
      try {
        this.history.push(`${PATH_DASHBOARD.user.root}/edit/${userId}`);
      } catch (err) {
        console.log(err);
      }
    } else if (error) {
      this.setError(error.message);
    }
  };

  // Create new user from dashboard
  updateProfile = async (variables, setState) => {
    const { data, error } = await this._performApolloRequest({
      mutation: UPDATE_PROFILE,
      variables,
    });
    if (data) {
      setState({
        loading: false,
        data: data.updateProfile.user.profile,
        error: null,
      });
      this.setSuccess("User successfully updated");
    } else if (error) {
      this.setError(error.message);
    }
  };

  public static getControls(client, history?): IUserControls {
    const controller = new UserController(client, history);
    return {
      createUser: controller.createUser,
      getUserList: controller.getUserList,
      getUserProfile: controller.getUserProfile,
      deleteUsers: controller.deleteUsers,
      updateProfile: controller.updateProfile,
    };
  }
}
