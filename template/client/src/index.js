// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './redux/store';

const history = createBrowserHistory();
const store = configureStore(history);

const rootEl = document.getElementById('root');

if (rootEl) {
  ReactDOM.render(<App history={history} store={store} />, rootEl);
  registerServiceWorker();
}

// $FlowFixMe
if (module.hot) {
  // $FlowFixMe
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default; // eslint-disable-line
    if (rootEl) {
      ReactDOM.render(<NextApp history={history} store={store} />, rootEl);
    }
  });
}
