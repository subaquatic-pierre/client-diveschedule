import React from "react";
import {
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
  firstCell: {
    minWidth: "20px",
    display: "flex",
    justifyContent: "center",
  },
  checkBox: {
    marginLeft: "-5px",
    padding: "0px",
  },
  checkBoxCell: {
    "&:hover": {
      cursor: "unset",
    },
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
      <TableRow>
        <TableCell padding="checkbox">
          <div className={classes.firstCell}>
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
              <>#</>
            )}
          </div>
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
