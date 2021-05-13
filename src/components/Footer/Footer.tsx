import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: theme.spacing(2)
  }
}));

export const Footer: React.FC = () => {
  const classes = useStyles();
  return <div className={classes.footer} />;
};
