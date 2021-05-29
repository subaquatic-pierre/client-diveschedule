import { filter } from "lodash";
import { Icon } from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import { useState, useEffect, ChangeEvent } from "react";
import moreVerticalFill from "@iconify/icons-eva/more-vertical-fill";
// material
import {
  Box,
  Card,
  Table,
  Avatar,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  IconButton,
  Typography,
  TableContainer,
  TablePagination,
  Button,
} from "@material-ui/core";
// redux
import { userController } from "../../controllers/user";
import { User } from "../../@types/user";
// routes
import { PATH_DASHBOARD } from "../../routes/paths";
// @types
// components
import Page from "../../components/Page";
import Scrollbar from "../../components/Scrollbar";
import SearchNotFound from "../../components/SearchNotFound";
import HeaderDashboard from "../../components/HeaderDashboard";
import { UserListHead, UserListToolbar } from "../../components/user/list";
import { useApolloClient } from "@apollo/client";
import useFetchStatus from "../../hooks/useFetchStatus";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  // { id: "role", label: "Role", alignRight: false },
  // { id: "isVerified", label: "Verified", alignRight: false },
  // { id: "status", label: "Status", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

type Anonymous = Record<string | number, string>;

function descendingComparator(a: User, b: User, orderBy: string) {
  const second = b.profile.fullName;
  const first = a.profile.fullName;
  if (second < first) {
    return -1;
  }
  if (second > first) {
    return 1;
  }
  return 0;
}

function getComparator(order: string, orderBy: string) {
  return order === "desc"
    ? (a: User, b: User) => descendingComparator(a, b, orderBy)
    : (a: User, b: User) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(
  array: User[],
  comparator: (a: any, b: any) => number,
  query: string
) {
  const stabilizedThis = array.map((el, index) => [el, index] as const);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) =>
        _user.profile.fullName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

const getUsersFromIds = (userIds: string[], users: User[]): User[] => {
  const filteredUsers: User[] = [];
  userIds.forEach((id) => {
    users.forEach((user) => {
      if (user.id === id) {
        filteredUsers.push(user);
      }
    });
  });
  return filteredUsers;
};

export default function UserList() {
  const client = useApolloClient();

  // Data State
  const [{ data: userList, loading, error }, setUserList] = useFetchStatus<
    User[]
  >([]);

  // Filter State
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [orderBy, setOrderBy] = useState("fullName");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Controllers
  const { getUserList } = userController(client);

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSetSelectedIds = (newSelected: string[]): void => {
    setSelectedIds(newSelected);
    setSelectedUsers(getUsersFromIds(newSelected, filteredUsers));
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

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  const filteredUsers = applySortFilter(
    userList,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  useEffect(() => {
    getUserList(setUserList);
  }, []);

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
                    .map((row, index) => {
                      const {
                        id: userId,
                        profile: { fullName },
                      } = row;
                      const isItemSelected = selectedIds.indexOf(userId) !== -1;

                      return (
                        <TableRow
                          hover
                          key={userId}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                          onClick={() => handleSelectUserClick(userId)}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox checked={isItemSelected} />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Box
                              sx={{
                                py: 2,
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Box
                                component={Avatar}
                                alt={fullName}
                                src={""}
                                sx={{ mx: 2 }}
                              />
                              <Typography variant="subtitle2" noWrap>
                                {fullName}
                              </Typography>
                            </Box>
                          </TableCell>

                          <TableCell align="right">
                            <IconButton>
                              <Icon
                                width={20}
                                height={20}
                                icon={moreVerticalFill}
                              />
                            </IconButton>
                          </TableCell>
                        </TableRow>
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
