import { useDispatch, useSelector } from "react-redux";

// redux
import { RootState } from "../redux/store";
import { login, register, logout } from "../redux/slices/authJwt";
// @types
import { User } from "../@types/account";

// ----------------------------------------------------------------------

type LoginParams = {
  email: string;
  password: string;
};

type RegisterParams = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

type Method = "jwt" | "firebase";

export default function useAuth(some: Method = "jwt") {
  const method = "jwt";
  // Firebase Auth
  const auth = {};
  const profile = {};

  // JWT Auth
  const dispatch = useDispatch();
  const { user, isLoading, isAuthenticated } = useSelector(
    (state: RootState) => state.authJwt
  );

  // JWT Auth
  if (method === "jwt") {
    return {
      method: "jwt",
      user,
      isLoading,
      isAuthenticated,

      login: ({ email, password }: LoginParams) =>
        dispatch(
          login({
            email,
            password,
          })
        ),

      register: ({ email, password, firstName, lastName }: RegisterParams) =>
        dispatch(
          register({
            email,
            password,
            firstName,
            lastName,
          })
        ),

      logout: () => dispatch(logout()),

      resetPassword: (some: any) => {},

      updateProfile: (data: any) => {},

      loginWithGoogle: () => {},

      loginWithFaceBook: () => {},

      loginWithTwitter: () => {},
    };
  }
}
