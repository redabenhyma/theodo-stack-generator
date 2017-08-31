import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import Page from './Page.component';

const PageWithIntl = injectIntl(Page);

function mapStateToProps() {
  return {};
}

function mapDispatchToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageWithIntl);
