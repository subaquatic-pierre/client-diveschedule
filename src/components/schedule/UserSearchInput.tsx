import React, { Dispatch, SetStateAction } from "react";

import { AutoCompleteSearch } from "../AutoCompleteSearch";
import { getUser, getUserOptions } from "./utils";
import { IUser } from "../../@types/schedule";
import { SEARCH_USERS } from "../../controllers/user/queries";

interface IUserSearchInputProps {
  setObject: Dispatch<SetStateAction<IUser>>;
  size?: string;
}

export const UserSearchInput: React.FC<IUserSearchInputProps> = ({
  setObject,
  size,
}: IUserSearchInputProps) => (
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
