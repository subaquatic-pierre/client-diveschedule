import React from "react";
import { makeStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { USERS_QUERY } from "./query";
import { AdminInfoBar } from "../../components/AdminInfoBar";
import { AdminNavList } from "../../components/AdminNavList";

import { AdminUserTable } from "../../components/AdminUserTable";

const useStyles = makeStyles((theme) => ({
  adminContent: {
    marginTop: "1rem",
  },
  navList: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export const Admin = withRouter((props) => {
  const classes = useStyles();
  const { data, loading } = useQuery(USERS_QUERY);

  let users: any[] = [];

  if (data) {
    data.allUsers.edges.forEach((user: any) => {
      users.push(user.node);
    });
  }

  if (loading) return <p>Loading...</p>;
  return (
    <Grid container xl>
      <Grid item xs={12}>
        <AdminInfoBar />
      </Grid>
      <Grid className={classes.adminContent} container spacing={2}>
        <Grid item xs={3}>
          <AdminNavList />
        </Grid>
        <Grid item xs={9}>
          <AdminUserTable users={users} />
        </Grid>
      </Grid>
    </Grid>
  );
});
