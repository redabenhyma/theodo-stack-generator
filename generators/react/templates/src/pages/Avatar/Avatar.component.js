// @flow
import * as React from 'react';
import { FormattedMessage, intlShape } from 'react-intl';

import StyledAvatar from './Avatar.style';

type Props = {
  intl: intlShape,
  fetchUser: (userId: string) => void,
  updateUserId: (value: string) => void,
  userAvatarUrl: string,
  userId: string,
};

class Avatar extends React.Component<Props> {
  onInputChange = (event: SyntheticInputEvent<HTMLInputElement>): void => {
    // "this" is the right instance of this component
    // For performance reasons, you should avoid
    // <button onClick={() => this.props.addItem('new item')}>
    // https://medium.com/netscape/react-performance-anti-pattern-creating-functions-in-render-ddeb5ebd2933)
    this.props.updateUserId(event.target.value);
  };

  fetchUser = () => {
    this.props.fetchUser(this.props.userId);
  };

  navigateTo = path => () => {
    this.props.history.push(path);
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { userAvatarUrl } = this.props;

    return (
      <StyledAvatar>
        <div role="button" tabIndex={0} onClick={this.navigateTo('/')}>
          <FormattedMessage id="page.back" />
        </div>
        <p>{formatMessage({ id: 'page.api-to-translate-example' })}</p>
        <p>
          <input
            className="github-avatar-input"
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
        {userAvatarUrl && <img src={userAvatarUrl} alt="user avatar" />}
      </StyledAvatar>
    );
  }
}

export default Avatar;
