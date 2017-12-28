import { all } from 'redux-saga/effects'; // eslint-disable-line
<% if (exampleRequired) { %>import { fetchUserSaga } from 'pages/Avatar/module';<% } %>

// single entry point to start all Sagas at once
export default function* rootSaga() {
  <% if (exampleRequired) { %>yield all([fetchUserSaga()]);<% } %>
}
