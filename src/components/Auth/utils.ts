export const getAuthToken = () => localStorage.getItem("token");

export const deleteAuthToken = () => {
  localStorage.removeItem("token");
};

export const needRefreshToken = (expDate: Date): boolean => {
  const now = new Date().getTime();
  const halfTime = expDate.getTime() / 2;
  const expTime = now + halfTime;
  if (now > expTime) {
    return true;
  }
  return false;
};
