export const buildForm = <IForm>(initialData, newData): IForm => {
  const keys = Object.keys(initialData);
  const newFormData = keys.reduce((prev, key: string) => {
    let item = { [key]: "" };
    if (newData[key]) {
      item = { [key]: newData[key] };
    }
    return { ...prev, ...item };
  }, {});
  return newFormData as IForm;
};
