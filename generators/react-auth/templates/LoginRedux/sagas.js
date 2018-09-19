// @flow
import { call, put, takeEvery } from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import { login } from 'services/networking/request';
import { loginUserSuccess, loginUserError } from './actions';
import { USER_LOGIN_REQUEST } from './constant';

export function* loginUser(action: LoginUserRequestAction): Saga<*> {
  const endpoint = `/login_check`;
  try {
    const token = yield call(login, endpoint, action.payload);
    yield put(loginUserSuccess(token));
  } catch (error) {
    yield put(loginUserError(error));
  }
}

export default function* loginUserSaga(): Saga<*> {
  yield takeEvery(USER_LOGIN_REQUEST, loginUser);
}
