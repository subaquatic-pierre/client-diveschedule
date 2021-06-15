import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import { Profile } from "../../@types/user";

const useStyles = makeStyles((theme) => ({
  firstCell: {
    borderRight: "none !important",
  },
  guideRow: {
    "&:not(:last-of-type)": {
      borderBottom: `0.5px solid ${theme.palette.grey[700]}`,
    },
    "& :hover": {
      cursor: "unset",
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
    <TableRow role="checkbox" className={classes.guideRow}>
      <TableCell className={classes.firstCell}></TableCell>
      <TableCell id={profile.fullName}>{profile.fullName}</TableCell>
      <TableCell></TableCell>
      <TableCell align="center">{profile.certLevel}</TableCell>
      <TableCell align="center">{profile.equipment}</TableCell>
    </TableRow>
  );
};
