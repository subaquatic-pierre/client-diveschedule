import React, { Dispatch, SetStateAction } from "react";

import { AutoCompleteSearch } from "../AutoCompleteSearch";
import { getUser, getUserOptions } from "./utils";
import { IUser } from "../../pages/Schedule/schedule";
import { SEARCH_USERS } from "./queries";

interface IUserSearchInputProps {
  setObject: Dispatch<SetStateAction<IUser>>;
  size?: string;
}

export const UserSearchInput: React.FC<IUserSearchInputProps> = ({
  setObject,
  size,
}: IUserSearchInputProps) => {
  return (
    <AutoCompleteSearch
      size={size}
      name="user"
      label="Full Name"
      setObject={setObject}
      getObject={getUser}
      getOptions={getUserOptions}
      createObjectPlaceholder="Create User"
      queryFieldName="fullName"
      gqlQuery={SEARCH_USERS}
      autoFocus
    />
  );
};
