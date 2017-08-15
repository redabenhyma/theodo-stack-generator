import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import './style.css';

export default class Page extends Component {
  static propTypes = {
    intl: PropTypes.object.isRequired,
  };

  render() {
    const { formatMessage } = this.props.intl;
    return (
      <div className='page-container'>
        <Link to='/'>
          <FormattedMessage id='page.back' />
        </Link>
        <p>{formatMessage({ id: 'page.api-to-translate-example' })}</p>
      </div>
    );
  }
}
