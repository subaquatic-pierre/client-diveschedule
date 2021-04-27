import { Auth } from "..";
import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";

describe("Auth tests", () => {
  it("renders without error", () => {
    const { getByText } = render(
      <MockedProvider>
        <Auth token="token" />
      </MockedProvider>
    );
  });
});
