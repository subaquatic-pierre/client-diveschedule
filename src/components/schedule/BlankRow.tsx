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
}));

export const BlankRow = ({ bookingNumber, showCreateBookingRow }: IProps) => {
  const classes = useStyles();
  return (
    <TableRow onClick={showCreateBookingRow}>
      <TableCell>
        <div className={classes.firstCell}>{bookingNumber}</div>
      </TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
};
