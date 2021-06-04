import React from "react";
import { makeStyles } from "@material-ui/core";

import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import TableRow from "@material-ui/core/TableRow";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { Booking } from "../../../@types/schedule";

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
  typography: {
    padding: theme.spacing(2),
  },
}));

interface IBookingRowProps {
  handleSelectClick: (name: number) => void;
  setEditingBookingId: (id: number) => void;
  selected: number[];
  bookingData: Booking;
}

export const ScheduleTableRow: React.FC<IBookingRowProps> = ({
  handleSelectClick,
  setEditingBookingId,
  selected,
  bookingData,
}) => {
  const {
    activityDetail: { activityType },
    id,
    time,
    diver: {
      email,
      profile: { fullName, certLevel },
    },
    diverRole,
    equipment,
  } = bookingData;

  const instructor = bookingData.instructor
    ? bookingData.instructor
    : undefined;
  let instructorName;
  if (instructor !== undefined) {
    instructorName = instructor.profile.fullName;
  }

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

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const handleEditButtonClick = () => {
    setEditingBookingId(id);
    handleMoreMenuClose();
  };

  const handleDeleteButtonClick = () => {
    handleMoreMenuClose();
  };

  const isBoatBooking =
    activityType === "AM_BOAT" || activityType === "PM_BOAT";

  return (
    <TableRow
      hover
      role="checkbox"
      aria-checked={isSelected(id)}
      tabIndex={-1}
      selected={isSelected(id)}
    >
      <TableCell padding="checkbox">
        <Checkbox
          onClick={() => handleSelectClick(id)}
          checked={isSelected(id)}
          inputProps={{ "aria-labelledby": email }}
        />
      </TableCell>
      <TableCell component="th" id={email} scope="row" padding="none">
        {fullName}
      </TableCell>
      <TableCell align="right">{diverRole}</TableCell>
      {isBoatBooking ? (
        <TableCell align="right">{certLevel}</TableCell>
      ) : (
        <TableCell align="right">{instructorName}</TableCell>
      )}
      <TableCell align="right">{equipment}</TableCell>
      {!isBoatBooking && <TableCell align="right">{time}</TableCell>}
      {/* <TableCell align="center" padding="none">
        {selected.length === 0 && (
          <Tooltip title="More options">
            <IconButton
              onClick={handleMoreButtonClick}
              size="small"
              aria-label="more menu"
            >
              <MoreHorizIcon className={classes.moreButton} />
            </IconButton>
          </Tooltip>
        )}
      </TableCell> */}
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
            {/* <ListItem button onClick={handleEditButtonClick}>
              <ListItemText primary="Edit" />
            </ListItem> */}
            <ListItem button onClick={handleDeleteButtonClick}>
              <ListItemText primary="Delete" />
            </ListItem>
          </List>
        </div>
      </Popover>
    </TableRow>
  );
};
