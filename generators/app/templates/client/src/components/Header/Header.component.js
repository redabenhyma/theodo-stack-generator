
import React, { Component } from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import PropTypes from 'prop-types';

import fr from 'react-intl/locale-data/fr';
import frMessages from '../../translations/fr.json';
import logo from './logo.svg';
import './style.css';

const locales = {
  fr: frMessages,
};

addLocaleData([...fr]);

export default class Root extends Component {
  static propTypes = {
    children: PropTypes.element,
  };

  render() {
    return (
      <div>
        <IntlProvider locale='fr' messages={locales['fr']} >
          <div className='App'>
            <div className='App-header'>
              <img src={logo} className='App-logo' alt='logo' />
              <h2>Welcome to React</h2>
            </div>
            {this.props.children}
          </div>
        </IntlProvider>
      </div>
    );
  }
}
