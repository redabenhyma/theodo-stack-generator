// @flow
import * as React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from './routes';

type Props = {
  store: Store,
  history: History,
};

class App extends React.Component<Props> {
  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={this.props.history} routes={routes} />
      </Provider>
    );
  }
}

export default App;
