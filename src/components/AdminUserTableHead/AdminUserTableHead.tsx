import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import { IUser } from "../../pages/Schedule/schedule";

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Full Name",
  },
  { id: "email", numeric: true, disablePadding: false, label: "Email" },
  {
    id: "certLevel",
    numeric: true,
    disablePadding: false,
    label: "Cert Level",
  },
  { id: "equipment", numeric: true, disablePadding: false, label: "Equipment" },
];

interface IAdminUserTableHeadProps {
  users: IUser[];
  setSelected: (selected: number[]) => void;
  numSelected: number;
  rowCount: number;
}

export const AdminUserTableHead: React.FC<IAdminUserTableHeadProps> = ({
  numSelected,
  rowCount,
  setSelected,
  users,
}) => {
  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelected = users.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={handleSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? "none" : "default"}
          >
            {headCell.label}
          </TableCell>
        ))}
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
};
