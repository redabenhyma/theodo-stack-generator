// @flow
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { actions } from 'redux/Avatar';

import Avatar from './Avatar';

const mapStateToProps = (state: Store): AvatarState => ({
  username: state.avatar.username,
  userAvatarUrl: state.avatar.userAvatarUrl,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUser(username) {
    dispatch(actions.fetchUserRequest(username));
  },
  updateUserId(username) {
    dispatch(actions.updateUserId(username));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Avatar));
