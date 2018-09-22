// @flow
import {
  UPDATE_USERNAME,
  USER_FETCH_REQUEST,
  USER_FETCH_SUCCESS,
  USER_FETCH_ERROR,
} from './constant';

export function updateUsername(username: string): UpdateUsernameActionType {
  return {
    type: UPDATE_USERNAME,
    payload: { username },
  };
}

export function fetchUserRequest(username: string): FetchUserRequestActionType {
  return {
    type: USER_FETCH_REQUEST,
    payload: { username },
  };
}

export function fetchUserSuccess(user: User): FetchUserSuccessActionType {
  return {
    type: USER_FETCH_SUCCESS,
    payload: { user },
  };
}

export function fetchUserError(error: ErrorType): FetchUserErrorActionType {
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
