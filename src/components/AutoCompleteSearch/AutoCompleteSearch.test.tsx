import { AutoCompleteSearch } from ".";
import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";

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
