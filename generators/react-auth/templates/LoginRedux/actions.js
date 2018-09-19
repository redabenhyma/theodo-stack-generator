// @flow
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR } from './constant';

export function loginUserRequest(payload: Object): LoginUserRequestAction {
  const { email, password } = payload;
  return {
    type: USER_LOGIN_REQUEST,
    payload: { email, password },
  };
}

export function loginUserSuccess(token: string): LoginUserSuccessAction {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: token,
  };
}

export function loginUserError(error: ErrorType): LoginUserErrorAction {
  return {
    type: USER_LOGIN_ERROR,
    payload: error.message,
  };
}

export default {
  loginUserRequest,
  loginUserSuccess,
  loginUserError,
};
