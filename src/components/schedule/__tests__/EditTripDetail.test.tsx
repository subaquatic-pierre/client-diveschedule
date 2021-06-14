import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";
import { EditTripDetailForm } from "../table/ActivityDetailForm";

describe("Edit diver form tests", () => {
  it("renders without error", () => {
    const { getByText } = render(
      <MockedProvider>
        <EditTripDetailForm handleClose={() => jest.fn()} />
      </MockedProvider>
    );
  });
});
