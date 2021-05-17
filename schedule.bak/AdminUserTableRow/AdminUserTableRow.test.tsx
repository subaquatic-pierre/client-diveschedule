import { render, fireEvent } from "@testing-library/react";
import { AdminUserTableRow } from ".";
import { IUser } from "../../pages/Schedule/schedule";

const user: IUser = {
  id: 1,
  email: "test@test.com",
  profile: {
    fullName: "Test Name",
    certificationLevel: "OW",
    equipment: "FK"
  }
};

const setSelected = jest.fn();
const deleteUser = jest.fn();
const handleEditDiverClick = jest.fn();

const defaultProps = {
  isItemSelected: false,
  labelId: "",
  setSelected,
  deleteUser,
  selected: [],
  user,
  handleEditDiverClick
};

const TestHOC = (props = defaultProps) =>
  render(
    <table>
      <tbody>
        <AdminUserTableRow {...props} />
      </tbody>
    </table>
  );

describe("AdminUserTableRow tests", () => {
  it("renders correct user in row", () => {
    const { getByText } = TestHOC();
    expect(getByText("Test Name")).toBeInTheDocument();
    expect(getByText("test@test.com")).toBeInTheDocument();
    expect(getByText("OW")).toBeInTheDocument();
    expect(getByText("FK")).toBeInTheDocument();
  });

  it("Highlights selected row", () => {
    const { getByTestId } = TestHOC({
      ...defaultProps,
      selected: [1],
      isItemSelected: true
    });
    expect(getByTestId("table-row").className).toContain("Mui-selected");
  });

  it("Calls handle set selected on checkbox click", () => {
    const { getByTestId } = TestHOC();
    const checkbox = getByTestId("checkbox");
    fireEvent(
      checkbox,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    );

    expect(setSelected).toHaveBeenCalled();
  });

  it("More menu shows when more button clicked", () => {
    const { getByTestId } = TestHOC();

    const moreButton = getByTestId("more-button");
    fireEvent(
      moreButton,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    );

    expect(getByTestId("delete-button")).toBeInTheDocument();
    expect(getByTestId("edit-button")).toBeInTheDocument();
  });

  it("Calls delete user when delete button clicked", () => {
    const { getByTestId } = TestHOC();

    const moreButton = getByTestId("more-button");
    fireEvent(
      moreButton,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    );

    const deleteButton = getByTestId("delete-button");
    fireEvent(
      deleteButton,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    );

    expect(deleteUser).toHaveBeenCalled();
  });

  it("Calls edit user when edit button clicked", () => {
    const { getByTestId } = TestHOC();

    const moreButton = getByTestId("more-button");
    fireEvent(
      moreButton,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    );

    const editUser = getByTestId("edit-button");
    fireEvent(
      editUser,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    );

    expect(handleEditDiverClick).toHaveBeenCalled();
  });
});
