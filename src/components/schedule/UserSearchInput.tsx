import React, { Dispatch, SetStateAction } from "react";

import { AutoCompleteSearch } from "../AutoCompleteSearch";
import { getUser, getUserOptions } from "./utils";
import { User } from "../../@types/user";
import { SEARCH_USERS } from "../../graphql/user/queries";

interface IUserSearchInputProps {
  setObject: Dispatch<SetStateAction<User>>;
  elementName?: string;
  autoFocus?: boolean;
  size?: string;
  label?: string;
}

export const UserSearchInput: React.FC<IUserSearchInputProps> = ({
  setObject,
  size,
  elementName,
  autoFocus,
  label,
}: IUserSearchInputProps) => (
  <AutoCompleteSearch
    size={size}
    name={elementName ? elementName : "user"}
    label={label ? label : "Full Name"}
    setObject={setObject}
    getObject={getUser}
    getOptions={getUserOptions}
    createObjectPlaceholder="Create User"
    queryFieldName="fullName"
    gqlQuery={SEARCH_USERS}
    autoFocus={autoFocus}
  />
);
