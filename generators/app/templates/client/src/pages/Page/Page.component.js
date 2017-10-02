import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage, intlShape } from 'react-intl';
import './style.css';

export default class Page extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    fetchUser: PropTypes.func.isRequired,
    updateUserId: PropTypes.func.isRequired,
    userAvatarUrl: PropTypes.string,
    userId: PropTypes.string,
  };

  onInputChange = (event) => {
    // "this" is the right instance of this component
    // For performance reasons, you should avoid
    // <button onClick={() => this.props.addItem('new item')}>
    // https://medium.com/netscape/react-performance-anti-pattern-creating-functions-in-render-ddeb5ebd2933)
    this.props.updateUserId(event.target.value);
  }

  fetchUser = () => {
    this.props.fetchUser(this.props.userId);
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { userAvatarUrl } = this.props;
    return (
      <div className="page-container">
        <Link to="/">
          <FormattedMessage id="page.back" />
        </Link>
        <p>{formatMessage({ id: 'page.api-to-translate-example' })}</p>
        <p>
          <input
            className="githubAvatarInput"
            type="text"
            onChange={this.onInputChange}
            placeholder={formatMessage({ id: 'page.add-github-username' })}
          />
        </p>
        <p>
          <button onClick={this.fetchUser}>
            <FormattedMessage id="page.fetch-github-avatar" />
          </button>
        </p>
        { userAvatarUrl &&
          <img src={userAvatarUrl} alt="user avatar" />
        }
      </div>
    );
  }
}
