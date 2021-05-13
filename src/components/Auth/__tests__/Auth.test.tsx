import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";
import { Auth } from "..";

describe("Auth tests", () => {
  it("renders without error", () => {
    const { getByText } = render(
      <MockedProvider>
        <Auth token="token" />
      </MockedProvider>
    );
  });
});
