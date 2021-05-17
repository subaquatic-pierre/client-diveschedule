import React from "react";

import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

import { useLazyQuery, DocumentNode } from "@apollo/client";

interface ISearchProps {
  setObject?: (object: any) => void;
  getObject: (filterString: string, data: any) => any;
  getOptions: (data: any) => any[];
  queryFieldName: string;
  createObjectPlaceholder: string;
  gqlQuery: DocumentNode;
  name: string;
  label: string;
  autoFocus?: boolean;
  handleOpenEditDiverModal?: () => void;
  size?: string | any;
}

export const AutoCompleteSearch: React.FC<ISearchProps> = ({
  setObject,
  getOptions,
  handleOpenEditDiverModal,
  getObject,
  size,
  gqlQuery,
  autoFocus = false,
  name = "search",
  label = "Label",
  createObjectPlaceholder = "Create",
  queryFieldName = "field",
}) => {
  const [query, { data }] = useLazyQuery(gqlQuery, {
    onError: (error) => {
      console.log(error);
    },
  });
  const [_, setSearchValue] = React.useState("");
  const [searchOptions, setSearchOptions] = React.useState<string[]>([]);
  const [searchInputValue, setSearchInputValue] = React.useState("");

  const filter = (
    value: string,
    filterCallback: (filterString: string, data: any) => any
  ) => filterCallback(value, data);

  const handleSearchChange = (event: any, value: any, optionKey: string) => {
    setSearchOptions(value ? [value, ...searchOptions] : searchOptions);
    const user = filter(value, getObject);
    if (!user || value === "Create User") {
      if (handleOpenEditDiverModal) handleOpenEditDiverModal();
    } else {
      if (setObject) setObject(user);
      setSearchValue(value);
    }
  };

  const handleSearchInputChange = (event: any, value: any) => {
    setSearchInputValue(value);
  };

  React.useEffect(() => {
    let active = true;
    if (searchInputValue === "") {
      setSearchOptions(
        searchInputValue ? [searchInputValue] : [createObjectPlaceholder]
      );
      return undefined;
    }
    if (active) {
      query({
        variables: {
          [queryFieldName]: searchInputValue || "",
        },
      });
      if (data) {
        const options = getOptions(data);
        if (options.length === 0) {
          setSearchOptions([createObjectPlaceholder]);
        } else {
          setSearchOptions(options);
        }
      }
    }

    return () => {
      active = false;
    };
  }, [
    queryFieldName,
    searchInputValue,
    getOptions,
    query,
    data,
    setSearchOptions,
    createObjectPlaceholder,
  ]);

  return (
    <Autocomplete
      freeSolo
      disableClearable
      id={name}
      getOptionLabel={(option: string) => option}
      filterOptions={(x) => x}
      options={searchOptions}
      size={size || "small"}
      onChange={handleSearchChange}
      onInputChange={handleSearchInputChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            type: "search",
            name,
            autoFocus,
          }}
        />
      )}
    />
  );
};
