import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { Header } from './components';
import { Home, Page } from './containers';

const routes = (
  <Route path="/" component={Header}>
    <IndexRoute component={Home} />
    <Route component={Page} path="/page" />
  </Route>
);

export default routes;
