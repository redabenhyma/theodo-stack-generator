// @flow
/**
 * Following the duck pattern, actions, constants and reducers are in the same file called module.js
 *
 * See: https://github.com/erikras/ducks-modular-redux
 *
 */

/**
 * Constants should be scoped to their module: use the string Page/ADD_ITEM instead of ADD_ITEM
 */

import { call, put, takeEvery } from 'redux-saga/effects';
import request from 'services/networking/request';
import { fromJS } from 'immutable';
export const UPDATE_USER_ID = 'Page/UPDATE_USER_ID';

export function updateUserId(userId: string): UpdateUserIdAction {
  return {
    type: UPDATE_USER_ID,
    payload: userId,
  };
}

export const USER_FETCH_REQUEST = 'Page/USER_FETCH_REQUEST';
export const USER_FETCH_SUCCESS = 'Page/USER_FETCH_SUCCESS';
export const USER_FETCH_ERROR = 'Page/USER_FETCH_ERROR';

export function fetchUserRequest(userId: string): FetchUserRequestAction {
  return {
    type: USER_FETCH_REQUEST,
    payload: { userId },
  };
}

export function fetchUserSuccess(user: User): FetchUserSuccessAction {
  return {
    type: USER_FETCH_SUCCESS,
    payload: user,
  };
}

export function fetchUserError(error: Error): FetchUserErrorAction {
  return {
    type: USER_FETCH_ERROR,
    payload: error.message,
  };
}

// worker Saga: will be fired on USER_FETCH_REQUEST actions
export function* fetchUser(action: FetchUserRequestAction): Generator<any, any, any> {
  const url = `https://api.github.com/users/${action.payload.userId}`;
  try {
    const user = yield call(request, url);
    yield put(fetchUserSuccess(user));
  } catch (error) {
    yield put(fetchUserError(error));
  }
}

/*
  Behavior similar to redux-thunk
  Starts fetchUser on each dispatched `USER_FETCH_REQUEST` action.
  Allows concurrent fetches of user.
*/
export function* fetchUserSaga(): Generator<any, any, any> {
  yield takeEvery(USER_FETCH_REQUEST, fetchUser);
}

const initialState = fromJS({
  userAvatarUrl: null,
});

/**
 * Following the duck pattern, the module.js file should export a reducer as a default function
 */
export default function reducer(state: PageStore = initialState, action: UserAction) {
  switch (action.type) {
    case UPDATE_USER_ID:
      return state.set('userId', action.payload);
    case USER_FETCH_SUCCESS:
      return state.set('userAvatarUrl', action.payload.avatar_url);
    default:
      return state;
  }
}
