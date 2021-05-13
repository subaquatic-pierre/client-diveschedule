import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";
import { Layout } from ".";

describe("Autocomplete search tests", () => {
  it("renders without error", () => {
    const { getByText } = render(
      <MockedProvider>
        <Layout />
      </MockedProvider>
    );
  });
});
