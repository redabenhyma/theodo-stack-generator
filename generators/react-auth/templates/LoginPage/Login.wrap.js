// @flow
import { connect } from "react-redux";

import { getLoginError } from "redux/Login";
import { loginUserRequest } from "redux/Login/actions";
import LoginFormContainer from "./Login";

const mapStateToProps = (state: Store): Object => ({
  loginError: getLoginError(state)
});

const mapDispatchToProps = dispatch => ({
  login: values => dispatch(loginUserRequest(values))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormContainer);
