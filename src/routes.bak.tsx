import React from "react";
import { Route, Switch } from "react-router-dom";

import { Schedule } from "./views/Schedule";
import { Admin } from "./views/Admin";
import { Login } from "./views/Login";

export const BaseRouter: React.FC = (props) => (
  <Switch>
    <Route exact path="/" component={Schedule} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/admin" component={Admin} />
  </Switch>
);
