import React from "react";
import { TableRow, TableCell } from "@material-ui/core";

interface IProps {
  bookingNumber: number;
  showCreateBookingRow?: () => void;
}

export const BlankRow = ({ bookingNumber, showCreateBookingRow }: IProps) => {
  return (
    <TableRow onClick={showCreateBookingRow} className={"schedule-table__row"}>
      <TableCell className={"schedule-table__first-cell"}>
        {bookingNumber}
      </TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
};
