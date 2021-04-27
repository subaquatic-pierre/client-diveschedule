import "date-fns";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  appBar: {
    flexGrow: 1,
  },
  dateDiv: {
    "&:hover": {
      cursor: "pointer",
    },
    display: "flex",
    alignContent: "center",
    alignItems: "center",
  },
  calendarDiv: {
    border: "none",
    padding: theme.spacing(2),
  },
}));

interface IAdminInfoBarProps {}

export const AdminInfoBar: React.FC<IAdminInfoBarProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.appBar}>
      <AppBar color="inherit" position="static">
        <Toolbar>
          <Typography variant="h6">Admin</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};
