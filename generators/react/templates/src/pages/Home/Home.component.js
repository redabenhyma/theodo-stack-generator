import React from 'react';
<% if (exampleRequired) { %>import { Link } from 'react-router-dom';<% } %>
import { FormattedMessage } from 'react-intl';

import StyledIntro from './Home.style';

<% if (exampleRequired) { %>
  const navigateTo = history => () => {
    history.push('/avatar');
  };
<% } %>

const Home = (<% if (exampleRequired) { %>{ history }<% } %>) => (
  <React.Fragment>
    <StyledIntro>
      <FormattedMessage
        id="home.get-started"
        defaultMessage="To get started, edit"
      />
      <code className="intro-code">src/App.js</code>
      <FormattedMessage id="home.save-to-reload" />
    </StyledIntro>
    <% if (exampleRequired) { %>
          <button onClick={navigateTo(history)}>
          <FormattedMessage id="home.click-me" />
        </button>
        <Link to="/avatar">
          <FormattedMessage id="home.use-a-link" />
        </Link>
    <% } %>
  </React.Fragment>
);

export default Home;
