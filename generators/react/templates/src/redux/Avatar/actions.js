// @flow
import {
  UPDATE_USERNAME,
  USER_FETCH_REQUEST,
  USER_FETCH_SUCCESS,
  USER_FETCH_ERROR,
} from './constant';

export function updateUsername(username: string): UpdateUsernameAction {
  return {
    type: UPDATE_USERNAME,
    payload: { username },
  };
}

export function fetchUserRequest(username: string): FetchUserRequestAction {
  return {
    type: USER_FETCH_REQUEST,
    payload: { username },
  };
}

export function fetchUserSuccess(user: User): FetchUserSuccessAction {
  return {
    type: USER_FETCH_SUCCESS,
    payload: { user },
  };
}

export function fetchUserError(error: ErrorType): FetchUserErrorAction {
  return {
    type: USER_FETCH_ERROR,
    payload: { error: error.message },
  };
}

export default {
  updateUsername,
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserError,
};
