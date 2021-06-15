import React from "react";
import clsx from "clsx";
import { Hidden, makeStyles } from "@material-ui/core";
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
  firstCell: {
    minWidth: "20px",
    display: "flex",
    justifyContent: "center",
  },
  fullName: {
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(1, 2),
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
    <>
      <Table size="small">
        {activity.diveGuides && activity.diveGuides.length > 0 && (
          <TableHead>
            <TableRow>
              <Hidden mdDown>
                <TableCell>
                  <div className={classes.firstCell}></div>
                </TableCell>
              </Hidden>
              <TableCell className={classes.fullName} align="left">
                Dive Guides
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <Hidden mdUp>
                <TableCell></TableCell>
              </Hidden>
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          <Hidden mdDown>
            <TableColFormat isBoatTrip={true} />
          </Hidden>
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
