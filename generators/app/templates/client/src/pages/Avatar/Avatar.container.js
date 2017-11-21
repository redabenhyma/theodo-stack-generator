// @flow
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { toJS } from '../../services/immutable/toJs';
import { fetchUserRequest, updateUserId } from './module';

import Avatar from './Avatar.component';

const AvatarWithIntl = injectIntl(Avatar);

const mapStateToProps = (state: Store): AvatarStore => ({
  userId: state.page.userId,
  userAvatarUrl: state.page.userAvatarUrl,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUser(userId) {
    dispatch(fetchUserRequest(userId));
  },
  updateUserId(userId) {
    dispatch(updateUserId(userId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(toJS(AvatarWithIntl));
