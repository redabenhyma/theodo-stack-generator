import { all } from 'redux-saga/effects'; // eslint-disable-line

<% if (exampleRequired) { %>import { sagas as avatarSagas } from 'redux/Avatar';<% } %>

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([<% if (exampleRequired) { %>avatarSagas()<% } %>]);
}
