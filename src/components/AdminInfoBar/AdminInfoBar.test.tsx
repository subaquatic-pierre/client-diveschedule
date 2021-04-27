import { AdminInfoBar } from ".";
import { render } from "@testing-library/react";

describe("Admin info bar tests", () => {
  it("renders without error", () => {
    const { getByText } = render(<AdminInfoBar />);
    expect(getByText("Admin")).toBeInTheDocument();
  });
});
