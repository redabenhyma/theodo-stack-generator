import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import './style.css';

export default class Page extends Component {
  static propTypes = {
    intl: PropTypes.object.isRequired, // eslint-disable-line
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    })),
    addItem: PropTypes.func.isRequired,
  };

  render() {
    const { formatMessage } = this.props.intl;
    return (
      <div className="page-container">
        <Link to="/">
          <FormattedMessage id="page.back" />
        </Link>
        <p>{formatMessage({ id: 'page.api-to-translate-example' })}</p>
        <button onClick={() => this.props.addItem('new item')}>
          <FormattedMessage id="home.click-me" />
        </button>
        <div className="itemContainer">
          { this.props.items.map(item => (
            <div key={item.id} >{item.label}</div>
          ))}
        </div>
      </div>
    );
  }
}
