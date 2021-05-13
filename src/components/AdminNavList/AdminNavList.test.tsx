import { render } from "@testing-library/react";
import { AdminNavList } from ".";

describe("Nav list tests", () => {
  it("renders without error", () => {
    const { getByText } = render(<AdminNavList />);
    expect(getByText("Users")).toBeInTheDocument();
  });
});
