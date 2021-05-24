export type Profile = {
  fullName: string;
  certificationLevel: string;
  equipment: string;
  phoneNumber: string;
  photoURL?: string;
  role?: string;
};

export type User = {
  id: string;
  email: string;
  isAdmin: boolean;
  profile: Profile;
};

export type Auth = {
  isAuthenticated?: boolean;
  user?: User;
};

export type AuthCache = {
  viewer: Auth;
};

export type LoginParams = {
  email: string;
  password: string;
};

export type RegisterParams = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
