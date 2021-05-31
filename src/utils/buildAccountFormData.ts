export interface FormState {
  afterSubmit?: string;
  fullName: string;
  email: string;
  equipment: string;
  certLevel: string;
  phoneNumber: string;
}

export const emptyFormVals: FormState = {
  fullName: "",
  email: "",
  phoneNumber: "",
  equipment: "",
  certLevel: "",
};

export const buildFormData = (
  profile,
  setError: (message: string) => void
): FormState => {
  try {
    const { fullName, equipment, certLevel, email, phoneNumber } = profile;
    return {
      fullName: fullName ? fullName : "Default",
      email: email,
      phoneNumber: phoneNumber ? phoneNumber : "",
      equipment: equipment ? equipment : "",
      certLevel: certLevel ? certLevel : "",
    };
  } catch (error) {
    setError(`Build from error: ${error.message}`);
    return emptyFormVals;
  }
};
