export const getUserOptions = (data: any): any[] =>
  data.searchUsers.edges.map((edge: any) => edge.node.profile.fullName);

export const getUser = (userName: string, data: any): IUser | undefined => {
  try {
    const edge = data.searchUsers.edges.filter(
      (edge: any) => edge.node.profile.fullName === userName
    )[0];
    return edge.node;
  } catch {
    return undefined;
  }
};
