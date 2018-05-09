// @flow
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import type { IntlShape } from 'react-intl';
import type { RouterHistory } from 'react-router-dom';

import StyledAvatar from './Avatar.style';

type Props = {
  intl: IntlShape,
  history: RouterHistory,
  fetchUser: (username: string) => void,
  updateUsername: (value: string) => void,
  userAvatarUrl: string,
  username: string,
};

class Avatar extends React.Component<Props> {
  onInputChange = (event: SyntheticInputEvent<HTMLInputElement>): void => {
    this.props.updateUsername(event.target.value);
  };

  fetchUser = (): void => {
    this.props.fetchUser(this.props.username);
  };

  navigateTo = (path: string): (() => void) => (): void => {
    this.props.history.push(path);
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { userAvatarUrl } = this.props;

    return (
      <StyledAvatar>
        <button tabIndex={0} onClick={this.navigateTo('/')}>
          <FormattedMessage id="page.back" />
        </button>
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
