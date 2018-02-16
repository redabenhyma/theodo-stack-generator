// @flow
import { all } from 'redux-saga/effects'; // eslint-disable-line
import type { Saga } from 'redux-saga';

<% if (exampleRequired) { %>import { sagas as avatarSagas } from 'redux/Avatar';<% } %>

// single entry point to start all Sagas at once
export default function* rootSaga(): Saga<*> {
  yield all(<% if (exampleRequired) { %>avatarSagas()<% } %>);
}
