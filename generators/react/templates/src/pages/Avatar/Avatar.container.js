// @flow
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { toJS } from 'services/immutable/toJs';
import { actions } from 'redux/Avatar';

import Avatar from './Avatar.component';

const mapStateToProps = (state: Store): AvatarStore => ({
  userId: state.avatar.get('userId'),
  userAvatarUrl: state.avatar.get('userAvatarUrl'),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUser(userId) {
    dispatch(actions.fetchUserRequest(userId));
  },
  updateUserId(userId) {
    dispatch(actions.updateUserId(userId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
  injectIntl(toJS(Avatar)),
);