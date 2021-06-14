import React from "react";
import {
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Skeleton,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  loading: {
    width: 300,
  },
}));

interface IScheduleTableLoadingProps {
  numCol: number;
}

export const TableLoading: React.FC<IScheduleTableLoadingProps> = ({
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
