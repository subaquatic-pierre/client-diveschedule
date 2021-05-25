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

export const buildFormData = (user): FormState => {
  try {
    const {
      email,
      profile: { fullName, equipment, certificationLevel },
    } = user;
    return {
      fullName: fullName ? fullName : "Default",
      email: email,
      phoneNumber: "Default",
      equipment: equipment ? equipment : "fullEquipment",
      certificationLevel: certificationLevel ? certificationLevel : "openWater",
    };
  } catch (error) {
    return emptyFormVals;
  }
};
