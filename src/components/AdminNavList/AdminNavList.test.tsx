import { AdminNavList } from ".";
import { render } from "@testing-library/react";

describe("Nav list tests", () => {
  it("renders without error", () => {
    const { getByText } = render(<AdminNavList />);
    expect(getByText("Users")).toBeInTheDocument();
  });
});
