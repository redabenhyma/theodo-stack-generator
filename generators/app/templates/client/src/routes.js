import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { Root } from './components';
import { Home, Page } from './pages';

const routes = (
  <Route path="/" component={Root}>
    <IndexRoute component={Home} />
    <Route component={Page} path="/page" />
  </Route>
);

export default routes;
