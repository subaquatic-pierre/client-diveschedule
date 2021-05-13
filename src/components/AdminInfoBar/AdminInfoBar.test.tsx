import { render } from "@testing-library/react";
import { AdminInfoBar } from ".";

describe("Admin info bar tests", () => {
  it("renders without error", () => {
    const { getByText } = render(<AdminInfoBar />);
    expect(getByText("Admin")).toBeInTheDocument();
  });
});
