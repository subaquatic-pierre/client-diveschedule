import React from "react";
import { makeStyles } from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import TableCell from "@material-ui/core/TableCell";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Tooltip from "@material-ui/core/Tooltip";
import Popover from "@material-ui/core/Popover";
import Checkbox from "@material-ui/core/Checkbox";
import TableRow from "@material-ui/core/TableRow";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { IUser } from "../../pages/Schedule/schedule";

const useStyles = makeStyles((theme) => ({
  moreMenu: {
    width: 150,
    maxWidth: 150,
    backgroundColor: theme.palette.background.paper,
  },
  moreButton: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  moreCell: {
    padding: theme.spacing(0, 2),
  },
  typography: {
    padding: theme.spacing(2),
  },
}));

interface IAdminUserTableRowProps {
  isItemSelected: boolean;
  labelId: string;
  setSelected: (selected: number[]) => void;
  deleteUser: (id: number) => void;
  selected: any[];
  user: IUser;
  handleEditDiverClick: (id: number) => void;
}

export const AdminUserTableRow: React.FC<IAdminUserTableRowProps> = ({
  isItemSelected,
  selected,
  user,
  labelId,
  deleteUser,
  setSelected,
  handleEditDiverClick,
}) => {
  const {
    email,
    id,
    profile: { fullName, equipment, certificationLevel },
  } = user;

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const moreMenuId = open ? "moreMenu" : undefined;

  const handleMoreMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMoreButtonClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEditButtonClick = () => {
    handleEditDiverClick(id);
    handleMoreMenuClose();
  };

  const handleDeleteButtonClick = () => {
    deleteUser(id);
    handleMoreMenuClose();
  };

  const handleClick = (event: React.ChangeEvent<HTMLElement>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  return (
    <TableRow
      hover
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={id}
      selected={isItemSelected}
      data-testid="table-row"
    >
      <TableCell padding="checkbox">
        <Checkbox
          onClick={(event: any) => handleClick(event, id)}
          checked={isItemSelected}
          data-testid="checkbox"
        />
      </TableCell>
      <TableCell component="th" id={labelId} scope="user" padding="none">
        {fullName}
      </TableCell>
      <TableCell align="left">{email}</TableCell>
      <TableCell align="left">{certificationLevel}</TableCell>
      <TableCell align="left">{equipment}</TableCell>
      <TableCell align="right" className={classes.moreCell}>
        {selected.length === 0 && (
          <Tooltip title="More options">
            <IconButton
              data-testid="more-button"
              onClick={handleMoreButtonClick}
              aria-label="more menu"
            >
              <MoreHorizIcon className={classes.moreButton} />
            </IconButton>
          </Tooltip>
        )}
      </TableCell>
      <Popover
        id={moreMenuId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleMoreMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div className={classes.moreMenu}>
          <List component="nav" aria-label="more menu nav">
            <ListItem
              button
              data-testid="edit-button"
              onClick={handleEditButtonClick}
            >
              <ListItemText primary="Edit" />
            </ListItem>
            <ListItem
              button
              data-testid="delete-button"
              onClick={handleDeleteButtonClick}
            >
              <ListItemText primary="Delete" />
            </ListItem>
          </List>
        </div>
      </Popover>
    </TableRow>
  );
};
