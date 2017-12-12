import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import './style.css';

const navigateTo = history => () => {
  history.push('/avatar');
};

const Home = ({ history }) => (
  <div>
    <p className="intro">
      <FormattedMessage
        id="home.get-started"
        defaultMessage="To get started, edit"
      />
      <code className="intro-code">src/App.js</code>
      <FormattedMessage id="home.save-to-reload" />
    </p>
    <button onClick={navigateTo(history)}>
      <FormattedMessage id="home.click-me" />
    </button>
    <Link to="/avatar">
      <FormattedMessage id="home.use-a-link" />
    </Link>
  </div>
);

export default Home;
