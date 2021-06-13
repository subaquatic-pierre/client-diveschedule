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
  head: {
    "& .MuiTableCell-head": {
      "&:first-of-type": {
        borderTopLeftRadius: "0px",
        borderBottomLeftRadius: "0px",
        boxShadow: "inset 0 0 0 #fff;",
        paddingLeft: "14px",
      },
      "&:last-of-type": {
        borderTopRightRadius: "0px",
        borderBottomRightRadius: "0px",
        boxShadow: "inset 0 0 0 #fff;",
      },
    },
  },
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
      <TableRow className={classes.head}>
        <TableCell
          padding="checkbox"
          align="center"
          className={classes.firstCell}
        >
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
          <TableCell
            key={index}
            align={isFirstField(index) ? "left" : "right"}
            // padding={isFirstField(index) ? "none" : "default"}
          >
            {headCell}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
