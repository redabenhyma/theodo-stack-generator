import React from 'react';
import { browserHistory, Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import './style.css';

const goToPage = () => {
  browserHistory.push('/page');
};

const Home = () => (
  <div>
    <p className="intro">
      <FormattedMessage
        id="home.get-started"
        defaultMessage="To get started, edit"
      />
      <code className="intro-code">src/App.js</code>
      <FormattedMessage id="home.save-to-reload" />
    </p>
    <button onClick={goToPage}>
      <FormattedMessage id="home.click-me" />
    </button>
    <Link to="/page">
      <FormattedMessage id="home.use-a-link" />
    </Link>
  </div>
);

export default Home;
