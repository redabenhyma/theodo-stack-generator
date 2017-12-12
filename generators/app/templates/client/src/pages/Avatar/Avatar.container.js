// @flow
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { toJS } from '../../services/immutable/toJs';
import { fetchUserRequest, updateUserId } from './module';

import Avatar from './Avatar.component';

const mapStateToProps = (state: Store): AvatarStore => {
  return {
    userId: state.avatar.get('userId'),
    userAvatarUrl: state.avatar.get('userAvatarUrl'),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUser(userId) {
    dispatch(fetchUserRequest(userId));
  },
  updateUserId(userId) {
    dispatch(updateUserId(userId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
  injectIntl(toJS(Avatar)),
);
