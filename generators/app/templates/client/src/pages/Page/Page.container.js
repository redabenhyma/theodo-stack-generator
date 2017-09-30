import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { fetchUserRequest, updateUserId } from './module';

import Page from './Page.component';

const PageWithIntl = injectIntl(Page);

const mapStateToProps = state => ({
  userId: state.page.userId,
  userAvatarUrl: state.page.userAvatarUrl,
});

const mapDispatchToProps = dispatch => ({
  fetchUser(userId) {
    dispatch(fetchUserRequest(userId));
  },
  updateUserId(userId) {
    dispatch(updateUserId(userId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageWithIntl);
