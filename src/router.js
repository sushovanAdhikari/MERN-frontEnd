import React from "react";
import { Switch, Route } from "react-router-dom";
import { SignIn } from "./components/pages/SignIn";
import { Dashboard } from "./components/pages/Dashboard";
import { PrivateRoute } from "./PrivateRoute";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={SignIn} />
    <PrivateRoute path="/Dashboard" component={Dashboard} />
  </Switch>
);

export default Routes;
