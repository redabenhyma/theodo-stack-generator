import { connect } from 'react-redux';
import { toJS } from '../../services/immutable/toJS';
import Home from './Home.component';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJS(Home));
