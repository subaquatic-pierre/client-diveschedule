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
    ...defaultUser,
    id: user.id,
    email: user.email,
    role: user.isAdmin ? "admin" : "user",
    displayName: user.profile.fullName,
  };
}
