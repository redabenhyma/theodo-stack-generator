// @flow
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import type { Dispatch } from 'redux';

import { actions } from 'redux/Avatar';
import Avatar from './Avatar';

const mapStateToProps = (state: Store): AvatarState => ({
  username: state.avatar.username,
  userAvatarUrl: state.avatar.userAvatarUrl,
});

const mapDispatchToProps = (dispatch: Dispatch<*>): Object => ({
  fetchUser(username) {
    dispatch(actions.fetchUserRequest(username));
  },
  updateUsername(username) {
    dispatch(actions.updateUsername(username));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Avatar));
