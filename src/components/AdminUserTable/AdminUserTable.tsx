import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";

import { AdminUserTableHead } from "../AdminUserTableHead";
import { EditDiverModal } from "../EditDiverModal";
import { AdminUserTableRow } from "../AdminUserTableRow";
import { AdminUserTableToolbar } from "../AdminUserTableToolbar";
import { DELETE_USER } from "./mutations";
import { useBaseMutation } from "../../hooks";
import { IUser } from "../../pages/Schedule/schedule";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

interface IAdminUserTableProps {
  users: IUser[];
}

export const AdminUserTable: React.FC<IAdminUserTableProps> = ({ users }) => {
  const classes = useStyles();
  const [selected, setSelected] = React.useState<number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editUserFormData, setEditUserFormData] = React.useState<
    IUser | undefined
  >(undefined);

  const { mutation: deleteUserMutation } = useBaseMutation(DELETE_USER);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditUserFormData(undefined);
    setModalOpen(false);
  };

  const handleEditDiverButtonClick = (id: number) => {
    const diverData = users.filter((user) => user.id === id)[0];
    setEditUserFormData(diverData);
    setModalOpen(true);
  };

  const handleDeleteUsers = (id?: number) => {
    if (id) {
      deleteUserMutation({ variables: { ids: [id] } });
    } else {
      const userIds = selected;
      deleteUserMutation({ variables: { ids: userIds } });
    }
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <AdminUserTableToolbar
          deleteUsers={handleDeleteUsers}
          handleOpenDiverFormModal={handleOpenModal}
          selectedUsers={selected}
          numSelected={selected.length}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="users table"
          >
            <AdminUserTableHead
              users={users}
              numSelected={selected.length}
              rowCount={users.length}
              setSelected={setSelected}
            />
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user: IUser, index) => {
                  const isItemSelected = isSelected(user.id);
                  const labelId = `table-checkbox-${index}`;

                  return (
                    <AdminUserTableRow
                      deleteUser={handleDeleteUsers}
                      key={user.id}
                      selected={selected}
                      setSelected={setSelected}
                      user={user}
                      isItemSelected={isItemSelected}
                      labelId={labelId}
                      handleEditDiverClick={handleEditDiverButtonClick}
                    />
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <EditDiverModal
        diverData={editUserFormData}
        open={modalOpen}
        handleClose={handleCloseModal}
      />
    </div>
  );
};
