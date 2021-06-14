import React from "react";
import { makeStyles } from "@material-ui/core";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@material-ui/core";

import { ActivityDetail } from "../../../@types/schedule";
import { GuideRow } from "./GuideRow";

const useStyles = makeStyles((theme) => ({
  tableTotalRow: {
    height: theme.spacing(7),
  },
  tableInfo: {
    marginTop: "auto",
    "& .guide_row:not(:last-child)": {
      borderBottom: `0.5px solid ${theme.palette.grey[700]}`,
    },
    "& .MuiTableCell-head": {
      "&:first-of-type": {
        borderTopLeftRadius: "0px",
        borderBottomLeftRadius: "0px",
        boxShadow: "inset 0 0 0 #fff;",
      },
      "&:last-of-type": {
        borderTopRightRadius: "0px",
        borderBottomRightRadius: "0px",
        boxShadow: "inset 0 0 0 #fff;",
      },
    },
  },
}));

interface IProps {
  activity: ActivityDetail;
  totalDivers: number;
}

export const TableInfo = ({ activity, totalDivers }: IProps) => {
  const classes = useStyles();
  return (
    <Table size="small" className={classes.tableInfo}>
      {activity.diveGuides && activity.diveGuides.length > 0 && (
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Dive Guides</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
      )}
      <TableBody>
        {activity.diveGuides?.map((guide, index) => (
          <GuideRow key={index} profile={guide.profile} />
        ))}
      </TableBody>
      <TableHead>
        <TableRow className={classes.tableTotalRow}>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell>Total Divers</TableCell>
          <TableCell align="right">{`${totalDivers}`}</TableCell>
        </TableRow>
      </TableHead>
    </Table>
  );
};
