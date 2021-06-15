import React from "react";

interface IProps {
  isBoatTrip: boolean;
}

export const TableColFormat = ({ isBoatTrip }: IProps) => {
  if (isBoatTrip) {
    return (
      <tr>
        <td width="50"></td>
        <td width="550"></td>
        <td width="150"></td>
        <td width="150"></td>
        <td width="100"></td>
      </tr>
    );
  } else {
    return (
      <tr>
        <td width="50"></td>
        <td width="325"></td>
        <td width="100"></td>
        <td width="325"></td>
        <td width="100"></td>
        <td width="100"></td>
      </tr>
    );
  }
};
