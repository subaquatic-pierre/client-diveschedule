import React from "react";
import { makeStyles } from "@material-ui/core";

import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import TableRow from "@material-ui/core/TableRow";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { IBooking, IProfile } from "../../../views/schedule/schedule";

const useStyles = makeStyles((theme) => ({
  guideRow: {
    backgroundColor: "#FAFF88",
  },
}));

interface IBookingRowProps {
  profile: IProfile;
}

export const ScheduleTableGuideRow: React.FC<IBookingRowProps> = ({
  profile,
}) => {
  const classes = useStyles();

  return (
    <TableRow className={classes.guideRow} role="checkbox">
      <TableCell padding="checkbox" />
      <TableCell
        component="th"
        id={profile.fullName}
        scope="row"
        padding="none"
      >
        {profile.fullName}
      </TableCell>
      <TableCell align="right">GUIDE</TableCell>
      <TableCell align="right">{profile.certificationLevel}</TableCell>
      <TableCell align="right">{profile.equipment}</TableCell>
    </TableRow>
  );
};
