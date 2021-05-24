// ----------------------------------------------------------------------

import { FormikProps } from "formik";

export type User = {
  id: string;
  displayName: string;
  email: string;
  password: string;
  photoURL: string | null;
  phoneNumber: string | null;
  country: string | null;
  address: string | null;
  state: string | null;
  city: string | null;
  zipCode: string | null;
  about: string | null;
  role: string;
  isPublic: boolean;
};

export type Profile = {
  id: string;
  cover: string;
  position: string;
  follower: number;
  following: number;
  quote: string;
  country: string;
  email: string;
  company: string;
  school: string;
  facebookLink: string;
  instagramLink: string;
  linkedinLink: string;
  twitterLink: string;
};

export type UserData = {
  id: string;
  avatarUrl: string;
  cover: string;
  name: string;
  follower: number;
  following: number;
  totalPost: number;
  position: string;
};

export type UserManager = {
  id: string;
  avatarUrl: string;
  name: string;
  company: string;
  isVerified: boolean;
  status: string;
  role: string;
};
