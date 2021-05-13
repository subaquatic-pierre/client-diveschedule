import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";
import { AutoCompleteSearch } from ".";

describe("Autocomplete search tests", () => {
  it("renders without error", () => {
    const { getByText } = render(
      <MockedProvider>
        <AutoCompleteSearch
          getObject={() => {}}
          getOptions={(data) => jest.fn() as any}
          queryFieldName=""
          createObjectPlaceholder=""
          gqlQuery={`` as any}
          name=""
          label=""
        />
      </MockedProvider>
    );
  });
});
