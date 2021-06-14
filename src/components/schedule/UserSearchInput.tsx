import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Autocomplete, TextField } from "@material-ui/core";
import { useHistory } from "react-router";

import { User } from "../../@types/user";
import { SEARCH_USERS } from "../../graphql/user/queries";

import { useLazyQuery } from "@apollo/client";
import { PATH_DASHBOARD } from "../../routes/paths";

interface IProps {
  setObject: Dispatch<SetStateAction<User>>;
  elementName?: string;
  autoFocus?: boolean;
  size?: "small" | "medium";
  label?: string;
  variant?: "outlined" | "standard" | "filled";
}

const getUser = (searchData: any, fullName: string): User | string => {
  try {
    return searchData.searchUsers.edges.filter(
      (edge: any) => edge.node.profile.fullName === fullName
    )[0].node;
  } catch (error) {
    return "";
  }
};

export const UserSearchInput: React.FC<IProps> = ({
  setObject,
  size,
  elementName,
  autoFocus,
  label,
  variant = "outlined",
}: IProps) => {
  const [query, { data: searchData, called }] = useLazyQuery(SEARCH_USERS, {
    fetchPolicy: "network-only",
    onError: (error) => {
      console.log(error);
    },
  });
  const [searchValue, setSearchValue] = React.useState("");
  const [searchOptions, setSearchOptions] = React.useState<string[]>([]);
  const history = useHistory();

  const handleSearchChange = (event: any, value: any, optionKey: string) => {
    setSearchValue(value);
    query({ variables: { fullName: value } });
  };

  // Get user from selected value and set user
  useEffect(() => {
    if (searchData) {
      if (searchValue === "Create User") {
        history.push(PATH_DASHBOARD.user.create);
      } else {
        const user = getUser(searchData, searchValue);
        if (user !== "") setObject(user as User);
      }
    }
  }, [searchValue]);

  // Update search options on server response
  useEffect(() => {
    if (called && searchData) {
      const options = searchData.searchUsers.edges.map(
        (edge: any) => edge.node.profile.fullName
      );
      setSearchOptions(options);
      if (options.length === 0) setSearchOptions(["Create User"]);
    }
  }, [searchData]);

  return (
    <Autocomplete
      freeSolo
      disableClearable
      id={elementName}
      getOptionLabel={(option: string) => option}
      filterOptions={(x) => x}
      options={searchOptions}
      size={size || "small"}
      value={searchValue}
      onInputChange={handleSearchChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant={variant}
          InputProps={{
            ...params.InputProps,
            type: "search",
            name: elementName,
            autoFocus,
          }}
        />
      )}
    />
  );
};
