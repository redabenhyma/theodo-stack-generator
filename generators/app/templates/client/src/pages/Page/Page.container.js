import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { addItem } from './module';

import Page from './Page.component';

const PageWithIntl = injectIntl(Page);

const mapStateToProps = state => ({
  items: state.page.list,
});

const mapDispatchToProps = dispatch => ({
  addItem(item) {
    dispatch(addItem(item));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageWithIntl);
