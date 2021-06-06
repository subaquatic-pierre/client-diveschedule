import React from "react";
import { makeStyles } from "@material-ui/core";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import { Profile } from "../../../@types/user";

const useStyles = makeStyles((theme) => ({
  guideRow: {
    backgroundColor: "#FAFF88",
    marginTop: "100px",
  },
}));

interface IBookingRowProps {
  profile: Profile;
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
      <TableCell align="right">{profile.certLevel}</TableCell>
      <TableCell align="right">{profile.equipment}</TableCell>
    </TableRow>
  );
};
