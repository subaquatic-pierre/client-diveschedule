import React from "react";
import { makeStyles } from "@material-ui/core";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import GroupIcon from "@material-ui/icons/Group";
import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";

const useStyles = makeStyles((theme) => ({
  navList: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

interface IAdminNavListProps {}

export const AdminNavList: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <List
        className={classes.navList}
        component="nav"
        aria-label="main mailbox folders"
      >
        <ListItem button>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AccessAlarmsIcon />
          </ListItemIcon>
          <ListItemText primary="Coming soon..." />
        </ListItem>
      </List>
    </>
  );
};
