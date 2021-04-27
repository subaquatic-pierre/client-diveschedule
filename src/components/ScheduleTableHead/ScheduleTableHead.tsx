import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";

interface IBoatScheduleTableHeadProps {
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  numSelected: number;
  rowCount: number;
  headFields: string[];
}

export const ScheduleTableHead: React.FC<IBoatScheduleTableHeadProps> = ({
  onSelectAllClick,
  numSelected,
  rowCount,
  headFields,
}) => {
  const isFirstField = (index: number): boolean => {
    if (index === 0) return true;
    return false;
  };
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headFields.map((headCell: string, index: number) => (
          <TableCell
            key={index}
            align={isFirstField(index) ? "left" : "right"}
            padding={isFirstField(index) ? "none" : "default"}
          >
            {headCell}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
