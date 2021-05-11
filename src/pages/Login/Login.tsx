import React, { useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

import { useBaseMutation } from "../../hooks";

import {
  Card,
  Button,
  Typography,
  FormControl,
  Grid,
  FormLabel,
  TextField,
} from "@material-ui/core";

import { LOGIN } from "./mutation";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "2rem 0",
    padding: "2rem",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textInput: {
    marginTop: "2rem",
  },
  button: {
    marginTop: "2rem",
    display: "block",
  },
  signup: {
    color: "white",
    marginTop: "1rem",
  },
}));

export const Login = withRouter((props) => {
  let token: any = null;
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { mutation: login } = useBaseMutation(LOGIN);
  const classes = useStyles();

  const handleTextChange = (event, id) => {
    if (id === "email") {
      setEmail(event.target.value);
    } else if (id === "password") {
      setPassword(event.target.value);
    }
  };

  const handleClick = () => {
    login({ variables: { email: email, password: password } })
      .then((res: any) => {
        token = res.data.tokenAuth.token;
        localStorage.setItem("token", token);
        window.location.assign("/");
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (token !== null) {
      props.history.push("/");
    }
  }, [token, props.history]);

  return (
    <>
      <Typography variant="h1">Login</Typography>
      <Grid container justify="center">
        <Grid item sm={6}>
          <Card className={classes.card}>
            <form className={classes.form} noValidate autoComplete="off">
              <FormControl component="fieldset">
                <FormLabel component="legend">Login:</FormLabel>
                <TextField
                  autoFocus
                  label="Email"
                  className={classes.textInput}
                  id="username"
                  value={email}
                  onChange={(event, id) => handleTextChange(event, "email")}
                />
                <TextField
                  className={classes.textInput}
                  id="password"
                  value={password}
                  onChange={(event, id) => handleTextChange(event, "password")}
                  label="Password"
                  type="password"
                />
              </FormControl>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={handleClick}
              >
                Login
              </Button>
            </form>
            <Link to="/signup" className={classes.signup}>
              Signup
            </Link>
          </Card>
        </Grid>
      </Grid>
    </>
  );
});
