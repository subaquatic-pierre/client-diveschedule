import React from "react";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import { Profile } from "../../@types/user";

interface IProps {
  profile: Profile;
}

export const GuideRow: React.FC<IProps> = ({ profile }) => {
  return (
    <TableRow className={"schedule-table__guide-row"} role="checkbox">
      <TableCell></TableCell>
      <TableCell id={profile.fullName}>{profile.fullName}</TableCell>
      <TableCell align="right">GUIDE</TableCell>
      <TableCell align="right">{profile.certLevel}</TableCell>
      <TableCell align="right">{profile.equipment}</TableCell>
    </TableRow>
  );
};
