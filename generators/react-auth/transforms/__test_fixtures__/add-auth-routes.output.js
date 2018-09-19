// @flow
import React from "react";
import { Route, Switch } from "react-router";
import { Home, Avatar, Login } from "./pages";

const routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/avatar" component={Avatar} />
  </Switch>
);

export default routes;
