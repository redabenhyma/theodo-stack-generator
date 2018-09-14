// @flow
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { injectIntl } from 'react-intl';

import { actions } from 'redux/Avatar';
import Avatar from './Avatar';

const mapStateToProps = (state: State): AvatarState => ({
  username: state.avatar.username,
  userAvatarUrl: state.avatar.userAvatarUrl,
});

const mapDispatchToProps = (dispatch: any): Object => ({
  fetchUser: (username: string): Dispatch<FetchUserRequestActionType> =>
    dispatch(actions.fetchUserRequest(username)),
  push: (pathName: string): Dispatch<*> => dispatch(push(pathName)),
  updateUsername: (username: string): Dispatch<UpdateUsernameActionType> =>
    dispatch(actions.updateUsername(username)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(Avatar));
