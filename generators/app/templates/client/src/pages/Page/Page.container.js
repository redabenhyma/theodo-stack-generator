import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import Page from './Page.component';

const PageWithIntl = injectIntl(Page);

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageWithIntl);
