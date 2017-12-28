import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home<% if (exampleRequired) { %>, Avatar<% } %> } from './pages';

const routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <% if (exampleRequired) { %><Route path="/avatar" component={Avatar} /><% } %>
  </Switch>
);

export default routes;
