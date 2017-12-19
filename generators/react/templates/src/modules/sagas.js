import { all } from 'redux-saga/effects';
import { fetchUserSaga } from 'pages/Avatar/module';

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([fetchUserSaga()]);
}
