import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { addItem } from './module';

import Page from './Page.component';

const PageWithIntl = injectIntl(Page);

function mapStateToProps(state) {
  return {
    items: state.page.list,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addItem(item) {
      dispatch(addItem(item));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageWithIntl);
