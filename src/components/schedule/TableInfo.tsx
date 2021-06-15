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

import { ActivityDetail } from "../../@types/schedule";
import { TableColFormat } from "./TableColFormat";
import { GuideRow } from "./GuideRow";

const useStyles = makeStyles((theme) => ({
  tableTotalRow: {
    height: theme.spacing(7),
  },
  tableInfo: {
    marginTop: "auto",
  },
  firstCell: {
    width: "25px",
  },
}));

interface IProps {
  activity: ActivityDetail;
  totalDivers: number;
}

export const TableInfo = ({ activity, totalDivers }: IProps) => {
  const classes = useStyles();
  return (
    <>
      <Table size="small" className={clsx(classes.tableInfo)}>
        {activity.diveGuides && activity.diveGuides.length > 0 && (
          <TableHead>
            <TableRow>
              <TableCell>
                <div className={classes.firstCell}></div>
              </TableCell>
              <TableCell align="left">Dive Guides</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          <TableColFormat isBoatTrip={true} />
          {activity.diveGuides?.map((guide, index) => (
            <GuideRow key={index} profile={guide.profile} />
          ))}
        </TableBody>
      </Table>
      <Table>
        <TableHead>
          <TableColFormat isBoatTrip={true} />
          <TableRow
            className={clsx(classes.tableTotalRow, "schedule-table__head-row")}
          >
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>Total Divers</TableCell>
            <TableCell></TableCell>
            <TableCell align="center">{`${totalDivers}`}</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </>
  );
};
