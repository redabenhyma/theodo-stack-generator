// @flow
import { connect } from 'react-redux';
import { toJS } from '../../services/immutable/toJs';
import Root from './Root.component';

function mapStateToProps(): Object {
  return {};
}

function mapDispatchToProps(): Object {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Root));
