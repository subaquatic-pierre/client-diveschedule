import React from "react";
import { Link, withRouter } from "react-router-dom";
import { AppBar, Tabs, Tab, makeStyles } from "@material-ui/core";

import { useAuthContext, useBaseMutation } from "../../hooks";

import { deleteAuthToken } from "../Auth";
import { DELETE_AUTH_TOKEN } from "./mutation";

const useStyles = makeStyles((theme) => ({
  header: {
    marginBottom: theme.spacing(2)
  }
}));

export const Header = withRouter(() => {
  const {
    isAuth,
    viewer: { isAdmin }
  } = useAuthContext();
  const classes = useStyles();
  const { mutation: logout } = useBaseMutation(DELETE_AUTH_TOKEN);

  const handleLogout = () => {
    deleteAuthToken();
    logout()
      .then((res: any) => {
        console.log(isAuth);
        window.location.assign("/login");
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  if (isAuth !== false) {
    return (
      <div className={classes.header}>
        <AppBar position="static">
          <Tabs value={false} centered aria-label="header links">
            <Tab component={Link} to="/" label="Home" />
            <Tab onClick={handleLogout} label="Logout" />
            {isAdmin && <Tab component={Link} to="/admin" label="Admin" />}
          </Tabs>
        </AppBar>
      </div>
    );
  }
  return (
    <div className={classes.header}>
      <AppBar position="static">
        <Tabs value={false} centered aria-label="header links">
          <Tab component={Link} to="/" label="Home" />
          <Tab component={Link} to="/login" label="Login" />
        </Tabs>
      </AppBar>
    </div>
  );
});
