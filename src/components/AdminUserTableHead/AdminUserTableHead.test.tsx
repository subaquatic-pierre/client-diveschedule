import { AdminUserTableHead } from ".";
import { render, prettyDOM } from "@testing-library/react";

const users: IUser[] = [
  {
    id: 1,
    email: "some@some.com",
    profile: {},
  },
  {
    id: 2,
    email: "test@some.com",
    profile: {},
  },
];

describe("AdminUserTableHead tests", () => {
  it("renders without error", () => {
    const { getByText, container } = render(
      <table>
        <AdminUserTableHead
          rowCount={users.length}
          numSelected={0}
          users={users}
          setSelected={() => jest.fn()}
        />
      </table>
    );
  });
});
