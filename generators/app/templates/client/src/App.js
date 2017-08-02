import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import routes from './routes';

class App extends React.Component {

  static propTypes = {
    store: React.PropTypes.object.isRequired, // eslint-disable-line
    history: React.PropTypes.object.isRequired, // eslint-disable-line
  };

  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={this.props.history} routes={routes} />
      </Provider>
    );
  }
}

export default App;
