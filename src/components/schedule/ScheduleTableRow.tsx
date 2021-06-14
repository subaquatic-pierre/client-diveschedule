import React from "react";
import { Typography } from "@material-ui/core";

import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import TableRow from "@material-ui/core/TableRow";

import { Booking } from "../../@types/schedule";

interface IProps {
  handleSelectClick: (name: number) => void;
  selected: number[];
  bookingData: Booking;
  index: number;
}

export const ScheduleTableRow: React.FC<IProps> = ({
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
      profile: { fullName, certLevel, equipment: userEquipment },
    },
    diverRole,
  } = bookingData;

  // Get instructor name if instructor exists
  let instructorName = "";
  if (bookingData.instructor) {
    instructorName = bookingData.instructor.profile.fullName;
  }

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const isBoatBooking =
    activityType === "AM_BOAT" || activityType === "PM_BOAT";

  return (
    <TableRow
      hover
      role="checkbox"
      onClick={() => handleSelectClick(id)}
      className={"schedule-table__row"}
      aria-checked={isSelected(id)}
      tabIndex={-1}
      selected={isSelected(id)}
    >
      <TableCell
        padding="none"
        align="center"
        className={"schedule-table__first-cell"}
      >
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
      <TableCell align="right">{userEquipment}</TableCell>
      {!isBoatBooking && <TableCell align="right">{time}</TableCell>}
    </TableRow>
  );
};
