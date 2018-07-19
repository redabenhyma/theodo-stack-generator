// @flow
import { call, put, takeEvery } from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import { makeGetRequest } from 'services/networking/request';
import { fetchUserSuccess, fetchUserError } from './actions';
import { USER_FETCH_REQUEST } from './constant';

// worker Saga: will be fired on USER_FETCH_REQUEST actions
export function* fetchUser(action: FetchUserRequestAction): Saga<*> {
  const endpoint = `/users/${action.payload.username}`;
  try {
    const response = yield call(makeGetRequest, endpoint);
    yield put(fetchUserSuccess(response.body));
  } catch (error) {
    yield put(fetchUserError(error));
  }
}

/*
  Behavior similar to redux-thunk
  Starts fetchUser on each dispatched `USER_FETCH_REQUEST` action.
  Allows concurrent fetches of user.
*/
export default function* fetchUserSaga(): Saga<*> {
  yield takeEvery(USER_FETCH_REQUEST, fetchUser);
}
