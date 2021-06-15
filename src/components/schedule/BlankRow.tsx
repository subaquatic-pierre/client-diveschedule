import React from "react";
import { TableRow, TableCell, makeStyles } from "@material-ui/core";

interface IProps {
  bookingNumber: number;
  showCreateBookingRow?: () => void;
}

const useStyles = makeStyles((theme) => ({
  firstCell: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  userName: {
    [theme.breakpoints.down("md")]: {
      minWidth: "200px",
    },
  },
}));

export const BlankRow = ({ bookingNumber, showCreateBookingRow }: IProps) => {
  const classes = useStyles();
  return (
    <TableRow onClick={showCreateBookingRow}>
      <TableCell>
        <div className={classes.firstCell}>{bookingNumber}</div>
      </TableCell>
      <TableCell className={classes.userName}></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
};
