import { Icon } from "@iconify/react";
import moreVerticalFill from "@iconify/icons-eva/more-vertical-fill";
// material
import {
  Avatar,
  Checkbox,
  TableRow,
  TableCell,
  IconButton,
  Typography,
  Popover,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { User } from "../../@types/user";
import { useState, MouseEvent } from "react";
import { PATH_DASHBOARD } from "../../routes/paths";

type UserListRowProps = {
  user: User;
  isItemSelected: boolean;
  noUsersSelected: boolean;
  handleSelectUserClick: (userId: string) => void;
};

export default function UserListRow({
  user,
  isItemSelected,
  noUsersSelected,
  handleSelectUserClick,
}: UserListRowProps) {
  const [editPopoverAnchorEl, setEditPopoverAnchorEl] = useState(null);
  const {
    id: userId,
    profile: { fullName },
  } = user;

  const handleMorePopoverOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setEditPopoverAnchorEl(event.currentTarget);
  };

  const handleMorePopoverClose = () => {
    setEditPopoverAnchorEl(null);
  };

  const open = Boolean(editPopoverAnchorEl);
  const id = open ? "edit-popover" : undefined;

  return (
    <TableRow
      hover
      key={userId}
      tabIndex={-1}
      role="checkbox"
      selected={isItemSelected}
      aria-checked={isItemSelected}
    >
      <TableCell padding="checkbox">
        <Checkbox
          onClick={() => handleSelectUserClick(userId)}
          checked={isItemSelected}
        />
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        <Box
          sx={{
            py: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box component={Avatar} alt={fullName} src={""} sx={{ mx: 2 }} />
          <Typography variant="subtitle2" noWrap>
            {fullName}
          </Typography>
        </Box>
      </TableCell>

      <TableCell align="right">
        {noUsersSelected && (
          <IconButton onClick={handleMorePopoverOpen}>
            <Icon width={16} height={16} icon={moreVerticalFill} />
          </IconButton>
        )}
      </TableCell>
      <Popover
        id={id}
        open={open}
        anchorEl={editPopoverAnchorEl}
        onClose={handleMorePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box sx={{ px: "0.5rem", minWidth: "200px" }}>
          <List>
            <ListItem
              button
              component="a"
              href={`${PATH_DASHBOARD.user.root}/edit/${userId}`}
            >
              <ListItemText primary="Edit User" />
            </ListItem>
          </List>
        </Box>
      </Popover>
    </TableRow>
  );
}
