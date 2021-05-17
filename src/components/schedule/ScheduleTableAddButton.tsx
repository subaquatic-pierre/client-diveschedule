import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";

export interface IAddRemoveButtonProps {
  showCreateBookingRow: () => void;
}

const useStyles = makeStyles((theme) => ({
  baseDiv: {
    display: "flex",
    justifyContent: "center"
  },
  button: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    margin: theme.spacing(2)
  }
}));

export const ScheduleTableAddButton: React.FC<IAddRemoveButtonProps> = ({
  showCreateBookingRow
}) => {
  const classes = useStyles();

  return (
    <div className={classes.baseDiv}>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<AddCircleIcon />}
        onClick={showCreateBookingRow}
      >
        Add Booking
      </Button>
    </div>
  );
};
