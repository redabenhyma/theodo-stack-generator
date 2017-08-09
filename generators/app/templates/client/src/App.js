import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { PropTypes } from 'prop-types'
import routes from './routes';

class App extends React.Component {

  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
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
