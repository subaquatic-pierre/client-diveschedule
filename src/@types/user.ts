export type Profile = {
  fullName: string;
  certLevel: string;
  equipment: string;
  phoneNumber?: string;
  photoURL?: string;
  role?: string;
  email?: string;
};

export type User = {
  id: string;
  email: string;
  isAdmin: boolean;
  profile: Profile;
};
