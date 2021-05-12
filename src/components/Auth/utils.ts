export const getAuthToken = () => {
  return localStorage.getItem("token");
};

export const deleteAuthToken = () => {
  localStorage.removeItem("token");
};

export const needRefreshToken = (expDate: Date): boolean => {
  const now = new Date().getTime();
  const halfTime = expDate.getTime() / 2;
  const expTime = now + halfTime;
  if (now > expTime) {
    return true;
  } else {
    return false;
  }
};
