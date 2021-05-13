import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";
import { EditDiverModal } from "../EditDiverModal";

describe("Edit diver form tests", () => {
  it("renders without error", () => {
    const { getByText } = render(
      <MockedProvider>
        <EditDiverModal open={false} handleClose={() => jest.fn()} />
      </MockedProvider>
    );
  });
});
