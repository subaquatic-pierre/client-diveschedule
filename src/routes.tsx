import React from "react";
import { Route, Switch } from "react-router-dom";

import { Schedule } from "./pages/Schedule";
import { Admin } from "./pages/Admin";
import { Login } from "./pages/Login";
import Signup from "./pages/Signup";

export const BaseRouter: React.FC = (props) => (
  <Switch>
    <Route exact path="/" component={Schedule} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/admin" component={Admin} />
  </Switch>
);
