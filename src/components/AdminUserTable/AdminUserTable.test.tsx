import { AdminUserTable } from ".";
import { render, prettyDOM, fireEvent } from "@testing-library/react";
import { IUser } from "../../pages/Schedule/schedule";
import { MockedProvider } from "@apollo/client/testing";

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

describe("Admin user table tests", () => {
  it("Renders without error", () => {
    const { getByText } = render(
      <MockedProvider>
        <AdminUserTable users={users} />
      </MockedProvider>
    );
    expect(getByText("test@some.com")).toBeInTheDocument();
    expect(getByText("some@some.com")).toBeInTheDocument();
  });

  it("Highlight toolbar on checkbox click", () => {
    const { getAllByTestId, getByTestId, container } = render(
      <MockedProvider>
        <AdminUserTable users={users} />
      </MockedProvider>
    );
    // const checkBox = getByTestId("admin-user-table-checkbox");
    // fireEvent(checkBox, new MouseEvent("click"));
    // console.log(prettyDOM(container, -1));
  });
});
