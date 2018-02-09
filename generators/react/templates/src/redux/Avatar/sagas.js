// @flow
import { call, put, takeEvery } from 'redux-saga/effects';
import request from 'services/networking/request';
import { fetchUserSuccess, fetchUserError } from './actions';
import { USER_FETCH_REQUEST } from './constant';

// worker Saga: will be fired on USER_FETCH_REQUEST actions
export function* fetchUser(
  action: FetchUserRequestAction,
): Generator<any, any, any> {
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
export default function* fetchUserSaga(): Generator<any, any, any> {
  yield takeEvery(USER_FETCH_REQUEST, fetchUser);
}
