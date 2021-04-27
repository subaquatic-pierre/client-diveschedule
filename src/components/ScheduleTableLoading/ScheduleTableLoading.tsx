import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  loading: {
    width: 300,
  },
}));

interface IScheduleTableLoadingProps {
  numCol: number;
}

export const ScheduleTableLoading: React.FC<IScheduleTableLoadingProps> = ({
  numCol,
}) => {
  const classes = useStyles();
  return (
    <TableBody>
      <TableRow className={classes.loading}>
        <TableCell colSpan={numCol}>
          <Skeleton animation="wave" />
        </TableCell>
      </TableRow>
      <TableRow className={classes.loading}>
        <TableCell colSpan={numCol}>
          <Skeleton animation="wave" />
        </TableCell>
      </TableRow>
      <TableRow className={classes.loading}>
        <TableCell colSpan={numCol}>
          <Skeleton animation="wave" />
        </TableCell>
      </TableRow>
    </TableBody>
  );
};
