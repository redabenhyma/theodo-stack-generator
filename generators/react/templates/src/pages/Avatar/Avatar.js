// @flow
import * as React from 'react';
import type { Dispatch } from 'redux';
import { FormattedMessage } from 'react-intl';
import type { IntlShape } from 'react-intl';

import StyledAvatar from './Avatar.style';

type Props = {
  fetchUser: (username: string) => void,
  intl: IntlShape,
  push: (pathName: string) => Dispatch<*>,
  updateUsername: (value: string) => void,
  userAvatarUrl: string,
  username: string,
};

class Avatar extends React.Component<Props> {
  onInputChange = (event: SyntheticInputEvent<HTMLInputElement>): void => {
    const { updateUsername } = this.props;
    updateUsername(event.target.value);
  };

  fetchUser = (): void => {
    const { fetchUser, username } = this.props;
    fetchUser(username);
  };

  navigateTo = (path: string): (() => void) => (): void => {
    const { push } = this.props;
    push(path);
  };

  render() {
    const { intl, userAvatarUrl } = this.props;
    const { formatMessage } = intl;

    return (
      <StyledAvatar>
        <button tabIndex={0} type="button" onClick={this.navigateTo('/')}>
          <FormattedMessage id="page.back" />
        </button>
        <p>
          <FormattedMessage id="page.api-to-translate-example" />
        </p>
        <p>
          <input
            className="github-avatar-input"
            type="text"
            onChange={this.onInputChange}
            placeholder={formatMessage({ id: 'page.add-github-username' })}
          />
        </p>
        <p>
          <button onClick={this.fetchUser} type="button">
            <FormattedMessage id="page.fetch-github-avatar" />
          </button>
        </p>
        {userAvatarUrl && <img src={userAvatarUrl} alt="user avatar" />}
      </StyledAvatar>
    );
  }
}

export default Avatar;
