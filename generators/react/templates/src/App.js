// @flow
import React from 'react';
import { type Store } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router';
import type { BrowserHistory } from 'history/createBrowserHistory';

import Routes from './routes';
import { Root } from './components';

type Props = {
  history: BrowserHistory,
  store: Store<State, *, *>,
};

const RootComponentWithRoutes = () => (
  <Root>
    <Routes />
  </Root>
);

class App extends React.Component<Props> {
  render() {
    const { history, store } = this.props;

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Route path="/" component={RootComponentWithRoutes} />
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
