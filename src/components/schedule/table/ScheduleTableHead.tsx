import React from "react";
import {
  makeStyles,
  Typography,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
} from "@material-ui/core";

interface IProps {
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  numSelected: number;
  rowCount: number;
  headFields: string[];
}

const useStyles = makeStyles((theme) => ({
  firstCell: {
    paddingLeft: "0px",
  },
}));

export const ScheduleTableHead: React.FC<IProps> = ({
  onSelectAllClick,
  numSelected,
  rowCount,
  headFields,
}) => {
  const classes = useStyles();
  const isFirstField = (index: number): boolean => {
    if (index === 0) return true;
    return false;
  };
  return (
    <TableHead>
      <TableRow className={"schedule-table__head-row"}>
        <TableCell padding="checkbox" className={classes.firstCell}>
          {numSelected > 0 ? (
            <Checkbox
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
        {headFields.map((headCell: string, index: number) => (
          <TableCell key={index} align={isFirstField(index) ? "left" : "right"}>
            {headCell}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
