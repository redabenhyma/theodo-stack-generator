//@flow
import * as React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import type { RouterHistory } from 'react-router-dom';

import StyledIntro from './Home.style';

const navigateTo = (history: RouterHistory): (() => void) => (): void => {
  history.push('/avatar');
};

type Props = {
  history: RouterHistory,
};

const Home = ({ history }: Props) => (
  <React.Fragment>
    <StyledIntro>
      <p>
        <FormattedMessage id="home.get-started" defaultMessage="To get started, edit" />
        <code className="intro-code">src/App.js</code>
        <FormattedMessage id="home.save-to-reload" />
      </p>
      <p>
        <FormattedMessage id="home.create-route" />
      </p>
      <p>
        <FormattedMessage id="home.generate-component" />
        <code className="intro-code">yarn generate</code>
      </p>
      <p>
        <FormattedMessage id="home.generate-module" />
      </p>
      <p>
        <FormattedMessage id="home.readme" />
      </p>
      <button onClick={navigateTo(history)}>
        <FormattedMessage id="home.click-me" />
      </button>
      <Link to="/avatar" href="/avatar">
        <FormattedMessage id="home.use-a-link" />
      </Link>
    </StyledIntro>
  </React.Fragment>
);

export default Home;
