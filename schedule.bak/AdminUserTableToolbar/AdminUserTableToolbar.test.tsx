import { fireEvent, render } from "@testing-library/react";
import { AdminUserTableToolbar } from ".";

const handleOpenDiverFormModal = jest.fn();
const deleteUsers = jest.fn();

const defaultProps = {
  numSelected: 0,
  handleOpenDiverFormModal,
  deleteUsers
};

const TestHOC = (props = defaultProps) =>
  render(<AdminUserTableToolbar {...props} />);

describe("AdminUserTableToolbat tests", () => {
  it("Create Diver button in the document when no users selected", () => {
    const { getByTestId } = TestHOC();

    expect(getByTestId("create-diver-button")).toBeInTheDocument();
  });

  it("Handle open diver edit modal called when button clicked", () => {
    const { getByTestId } = TestHOC();
    const createDiverButton = getByTestId("create-diver-button");

    fireEvent(
      createDiverButton,
      new MouseEvent("click", { bubbles: true, cancelable: true })
    );

    expect(handleOpenDiverFormModal).toHaveBeenCalled();
  });

  it("Delete button is in the document when at least one user is selected", () => {
    const { getByTestId } = TestHOC({ ...defaultProps, numSelected: 1 });

    expect(getByTestId("delete-button")).toBeInTheDocument();
  });

  it("Delete method call on delete button click", () => {
    const { getByTestId } = TestHOC({ ...defaultProps, numSelected: 1 });
    const deleteButton = getByTestId("delete-button");
    fireEvent(
      deleteButton,
      new MouseEvent("click", { bubbles: true, cancelable: true })
    );

    expect(deleteUsers).toHaveBeenCalled();
  });
});
