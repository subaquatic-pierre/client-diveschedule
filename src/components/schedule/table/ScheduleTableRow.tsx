import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import TableRow from "@material-ui/core/TableRow";

import { Booking } from "../../../@types/schedule";

const useStyles = makeStyles((theme) => ({
  row: {
    borderBottom: `0.5px solid ${theme.palette.grey[400]}`,
    height: "38px",
    "& :hover": {
      cursor: "pointer",
    },
  },
  firstCell: {
    paddingLeft: "0px !important",
    borderRight: `0.5px solid ${theme.palette.grey[400]}`,
  },
}));

interface IBookingRowProps {
  handleSelectClick: (name: number) => void;
  selected: number[];
  bookingData: Booking;
  index: number;
}

export const ScheduleTableRow: React.FC<IBookingRowProps> = ({
  handleSelectClick,
  index,
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

  // Get instructor name if instructor exists
  let instructorName = "";
  if (bookingData.instructor) {
    instructorName = bookingData.instructor.profile.fullName;
  }

  const classes = useStyles();

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const isBoatBooking =
    activityType === "AM_BOAT" || activityType === "PM_BOAT";

  return (
    <TableRow
      hover
      role="checkbox"
      onClick={() => handleSelectClick(id)}
      className={classes.row}
      aria-checked={isSelected(id)}
      tabIndex={-1}
      selected={isSelected(id)}
    >
      <TableCell padding="none" align="center" className={classes.firstCell}>
        {selected.length > 0 ? (
          <Checkbox
            size="small"
            checked={isSelected(id)}
            inputProps={{ "aria-labelledby": email }}
          />
        ) : (
          <Typography>{index + 1}</Typography>
        )}
      </TableCell>
      <TableCell id={email}>{fullName}</TableCell>
      <TableCell align="right">{diverRole.toUpperCase()}</TableCell>
      {isBoatBooking ? (
        <TableCell align="right">{certLevel}</TableCell>
      ) : (
        <TableCell align="right">{instructorName}</TableCell>
      )}
      <TableCell align="right">{equipment}</TableCell>
      {!isBoatBooking && <TableCell align="right">{time}</TableCell>}
    </TableRow>
  );
};
