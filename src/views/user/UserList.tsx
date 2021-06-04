import { useState, useEffect, ChangeEvent } from "react";
import { useApolloClient } from "@apollo/client";
import { Icon } from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";

// material
import {
  Box,
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Container,
  TableContainer,
  TablePagination,
  Button,
} from "@material-ui/core";

// types
import { User } from "../../@types/user";

// routes
import { PATH_DASHBOARD } from "../../routes/paths";

// components
import Page from "../../components/Page";
import Scrollbar from "../../components/Scrollbar";
import SearchNotFound from "../../components/SearchNotFound";
import HeaderDashboard from "../../components/HeaderDashboard";
import UserListRow from "../../components/user/list/UserListRow";
import { UserListHead, UserListToolbar } from "../../components/user/list";

// utils
import {
  getComparator,
  applySortFilter,
  getUsersFromIds,
  normalizeUserList,
  filterDeletedUsers,
} from "../../utils/userListVIew";

// hooks
import { useBaseMutation } from "../../hooks/useBaseMutation";
import { useBaseQuery } from "../../hooks/useBaseQuery";
import { USER_LIST_QUERY, DELETE_USERS } from "../../graphql/user";

// controllers
import { messageController } from "../../controllers/messages";

// components
import LoadingScreen from "../../components/LoadingScreen";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "phoneNumber", label: "Phone Number", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "certLevel", label: "Certification Level", alignRight: false },
  { id: "equipment", label: "Equipment", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

export default function UserList() {
  const client = useApolloClient();
  const { setError } = messageController(client);

  // Delete user mutation
  const { mutation: deleteUsers } = useBaseMutation(DELETE_USERS, {
    successMessage: "Users successfully deleted",
    onError: (err) => {
      setError(err.message);
      const users: User[] = normalizeUserList(queryData.allUsers);
      setUserList(users);
    },
  });

  // User list state
  const [userList, setUserList] = useState<User[]>([]);
  const { data: queryData, loading } = useBaseQuery(USER_LIST_QUERY);

  // Filter State
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [orderBy, setOrderBy] = useState("fullName");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Delete Dialog State
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSetSelectedIds = (newSelected: string[]): void => {
    setSelectedIds((oldState) => {
      setSelectedUsers(getUsersFromIds(newSelected, filteredUsers));
      return newSelected;
    });
  };

  const handleSelectAllClick = (checked: boolean) => {
    if (checked) {
      if (selectedIds.length > 0) {
        handleSetSelectedIds([]);
        return;
      } else {
        const newSelecteds = userList.map((n) => n.id);
        handleSetSelectedIds(newSelecteds);
        return;
      }
    }
    handleSetSelectedIds([]);
  };

  const handleSelectUserClick = (userId: string) => {
    const selectedIndex = selectedIds.indexOf(userId);
    let newSelected: string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedIds, userId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedIds.slice(1));
    } else if (selectedIndex === selectedIds.length - 1) {
      newSelected = newSelected.concat(selectedIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedIds.slice(0, selectedIndex),
        selectedIds.slice(selectedIndex + 1)
      );
    }
    handleSetSelectedIds(newSelected);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (filterName: string) => {
    setFilterName(filterName);
  };

  const handleConfirmDelete = () => {
    deleteUsers({ variables: { ids: selectedIds } });
    const filteredUsers = filterDeletedUsers(selectedIds, userList);
    setUserList(filteredUsers);
    setSelectedIds([]);
    setDeleteDialogOpen(false);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  const filteredUsers = applySortFilter(
    userList,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  // Set user list on data fetch response
  useEffect(() => {
    if (queryData && !loading) {
      const users: User[] = normalizeUserList(queryData.allUsers);
      setUserList(users);
    }
  }, [queryData, loading]);

  if (loading) return <LoadingScreen />;

  return (
    <Page title="User: List | DiveSchedule">
      <Container>
        <HeaderDashboard
          heading="User List"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Users" },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Icon icon={plusFill} width={20} height={20} />}
              href={PATH_DASHBOARD.user.create}
            >
              New User
            </Button>
          }
        />

        <Card>
          <UserListToolbar
            numSelected={selectedIds.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            selectedUsers={selectedUsers}
            deleteDialogOpen={deleteDialogOpen}
            setDeleteDialogOpen={setDeleteDialogOpen}
            handleConfirmDelete={handleConfirmDelete}
            setSelectedUsers={handleSetSelectedIds}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={userList.length}
                  numSelected={selectedIds.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user, index) => {
                      const { id: userId } = user;
                      const isItemSelected = selectedIds.indexOf(userId) !== -1;

                      return (
                        <UserListRow
                          key={index}
                          user={user}
                          handleSelectUserClick={handleSelectUserClick}
                          isItemSelected={isItemSelected}
                          noUsersSelected={selectedIds.length <= 0}
                          openDeleteDialog={() => setDeleteDialogOpen(true)}
                        />
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {/* If no users found */}
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6}>
                        <Box sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={userList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => setPage(page)}
            onRowsPerPageChange={(e) => handleChangeRowsPerPage(e)}
          />
        </Card>
      </Container>
    </Page>
  );
}
