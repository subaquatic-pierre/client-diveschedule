import { EditDiverModal } from "../EditDiverModal";
import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";

describe("Edit diver form tests", () => {
  it("renders without error", () => {
    const { getByText } = render(
      <MockedProvider>
        <EditDiverModal open={false} handleClose={() => jest.fn()} />
      </MockedProvider>
    );
  });
});
