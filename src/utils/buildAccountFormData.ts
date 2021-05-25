export interface FormState {
  afterSubmit?: string;
  fullName: string;
  email: string;
  equipment: string;
  certificationLevel: string;
  phoneNumber: string;
}

export const emptyFormVals: FormState = {
  fullName: "",
  email: "",
  phoneNumber: "",
  equipment: "",
  certificationLevel: "",
};

export const buildFormData = (
  user,
  setError: (message: string) => void
): FormState => {
  try {
    const {
      email,
      profile: { fullName, equipment, certificationLevel },
    } = user;
    return {
      fullName: fullName ? fullName : "Default",
      email: email,
      phoneNumber: "Default",
      equipment: equipment ? equipment : "",
      certificationLevel: certificationLevel ? certificationLevel : "",
    };
  } catch (error) {
    setError(`Build from error: ${error.message}`);
    return emptyFormVals;
  }
};
