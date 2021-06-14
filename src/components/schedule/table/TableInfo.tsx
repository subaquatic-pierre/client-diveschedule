import React from "react";
import clsx from "clsx";
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
  },
}));

interface IProps {
  activity: ActivityDetail;
  totalDivers: number;
}

export const TableInfo = ({ activity, totalDivers }: IProps) => {
  const classes = useStyles();
  return (
    <Table size="small" className={clsx(classes.tableInfo)}>
      {activity.diveGuides && activity.diveGuides.length > 0 && (
        <TableHead>
          <TableRow className={"schedule-table__head-row"}>
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
        <TableRow
          className={clsx(classes.tableTotalRow, "schedule-table__head-row")}
        >
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
