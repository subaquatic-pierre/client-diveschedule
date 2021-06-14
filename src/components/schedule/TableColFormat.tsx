import React from "react";

interface IProps {
  isBoatTrip: boolean;
}

export const TableColFormat = ({ isBoatTrip }: IProps) => {
  if (isBoatTrip) {
    return (
      <tr>
        <td width="40"></td>
        <td width="400"></td>
        <td width="100"></td>
        <td width="100"></td>
        <td width="100"></td>
      </tr>
    );
  } else {
    return (
      <tr>
        <td width="60"></td>
        <td width="400"></td>
        <td width="70"></td>
        <td width="400"></td>
        <td width="70"></td>
        <td width="70"></td>
      </tr>
    );
  }
};
