import React from "react";
import {
  Typography,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
  makeStyles,
} from "@material-ui/core";

interface IProps {
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  numSelected: number;
  rowCount: number;
  headFields: string[];
}

const useStyles = makeStyles((theme) => ({
  checkBox: {
    marginLeft: "-6px !important",
  },
  checkBoxCell: {
    paddingLeft: "26px !important",
  },
}));

export const ScheduleTableHead: React.FC<IProps> = ({
  onSelectAllClick,
  numSelected,
  rowCount,
  headFields,
}) => {
  const classes = useStyles();
  return (
    <TableHead>
      <TableRow className={"schedule-table__head-row"}>
        <TableCell padding="checkbox" className={classes.checkBoxCell}>
          {numSelected > 0 ? (
            <Checkbox
              className={classes.checkBox}
              size="small"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ "aria-label": "select all desserts" }}
            />
          ) : (
            <Typography>#</Typography>
          )}
        </TableCell>
        {headFields.map((headCell: string, index: number) => {
          if (headCell === "Instructor") {
            return (
              <TableCell key={index} align="center">
                {headCell}
              </TableCell>
            );
          } else {
            return (
              <TableCell key={index} align={index === 0 ? "left" : "center"}>
                {headCell}
              </TableCell>
            );
          }
        })}
      </TableRow>
    </TableHead>
  );
};
