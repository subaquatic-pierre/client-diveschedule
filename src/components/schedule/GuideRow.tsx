import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { TableRow, TableCell, Hidden } from "@material-ui/core";

import { Profile } from "../../@types/user";

const useStyles = makeStyles((theme) => ({
  fullName: {
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(0.5, 2),
      borderRight: "none !important",
    },
  },
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
      <Hidden mdDown>
        <TableCell>
          <div className={classes.firstCell}></div>
        </TableCell>
      </Hidden>
      <TableCell className={classes.fullName} id={profile.fullName}>
        {profile.fullName}
      </TableCell>
      <TableCell></TableCell>
      <TableCell align="center">{profile.certLevel}</TableCell>
      <TableCell align="center">{profile.equipment}</TableCell>
      <Hidden mdUp>
        <TableCell></TableCell>
      </Hidden>
    </TableRow>
  );
};
