// @flow
import {
  UPDATE_USER_ID,
  USER_FETCH_REQUEST,
  USER_FETCH_SUCCESS,
  USER_FETCH_ERROR,
} from './constant';

export function updateUserId(username: string): UpdateUserIdAction {
  return {
    type: UPDATE_USER_ID,
    payload: username,
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
    payload: user,
  };
}

export function fetchUserError(error: ErrorType): FetchUserErrorAction {
  return {
    type: USER_FETCH_ERROR,
    payload: error.message,
  };
}

export default {
  updateUserId,
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserError,
};
