import { User } from "../@types/user";

type BuildAccountFormProps = {
  mode: string;
  user?: User;
  userId?: string;
  getUser: (id: string) => User;
};

export interface InitialFormState {
  afterSubmit?: string;
  fullName: string;
  email: string;
  equipment: string;
  certificationLevel: string;
  phoneNumber: string;
}

const emptyFormVals: InitialFormState = {
  fullName: "",
  email: "",
  phoneNumber: "",
  equipment: "",
  certificationLevel: "",
};

const _getUserVals = (user): InitialFormState => {
  return {
    fullName: user.profile.fullName,
    email: user.email,
    phoneNumber: user.profile.phoneNumber,
    equipment: user.profile.equipment,
    certificationLevel: user.profile.certificationLevel,
  };
};

export const buildAccountFormData = ({
  mode,
  user,
  userId,
  getUser,
}: BuildAccountFormProps): InitialFormState => {
  if (user && mode === "account") return _getUserVals(user);
  if (mode === "edit") {
    const user = getUser(userId);
    return _getUserVals(user);
  }
  return emptyFormVals;
};
