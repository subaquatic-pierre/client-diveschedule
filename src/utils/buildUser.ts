import { userInfo } from "node:os";

export const defaultUser = {
  id: "",
  displayName: "",
  email: "",
  password: "",
  photoURL: null,
  phoneNumber: null,
  country: null,
  address: null,
  state: null,
  city: null,
  zipCode: null,
  about: null,
  role: "",
  isPublic: true,
};

const defaultViewer = {
  email: "",
  id: "AnonymousUser",
  isAdmin: false,
  profile: { fullName: "Default" },
};

export default function buildUser(user = defaultViewer) {
  return {
    id: user.id,
    email: user.email,
    displayName: user.profile.fullName.split(" ")[0],
    ...defaultUser,
  };
}
