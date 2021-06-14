import React from "react";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import { Profile } from "../../../@types/user";

const useStyles = makeStyles((theme) => ({
  guideRow: {
    "& :not(:last-of-kind)": {
      borderBottom: `0.5px solid ${theme.palette.grey[700]}`,
    },
    backgroundColor: "#FAFF88",
  },
}));

interface IProps {
  profile: Profile;
}

export const GuideRow: React.FC<IProps> = ({ profile }) => {
  const classes = useStyles();

  return (
    <TableRow className={clsx(classes.guideRow, "guide_row")} role="checkbox">
      <TableCell></TableCell>
      <TableCell id={profile.fullName}>{profile.fullName}</TableCell>
      <TableCell align="right">GUIDE</TableCell>
      <TableCell align="right">{profile.certLevel}</TableCell>
      <TableCell align="right">{profile.equipment}</TableCell>
    </TableRow>
  );
};
