// @flow
import * as React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, intlShape } from 'react-intl';
import './style.css';

type Props = {
  intl: intlShape,
  fetchUser: (userId: string) => void,
  updateUserId: (value: string) => void,
  userAvatarUrl: string,
  userId: string,
};

class Page extends React.Component<Props> {
  onInputChange = (event: SyntheticInputEvent<HTMLInputElement>): void => {
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

export default Page;
