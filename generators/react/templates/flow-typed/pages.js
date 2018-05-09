// @flow
/* eslint-disable no-undef, flowtype/delimiter-dangle */

<% if (exampleRequired) { %>
declare type User = {
  avatar_url?: string,
};

declare type UpdateUsernameAction = {
  type: 'Avatar/UPDATE_USERNAME',
  payload: { username: string },
};

declare type FetchUserRequestAction = {
  type: 'Avatar/USER_FETCH_REQUEST',
  payload: { username: string },
};

declare type FetchUserSuccessAction = {
  type: 'Avatar/USER_FETCH_SUCCESS',
  payload: { user: User },
};

declare type FetchUserErrorAction = {
  type: 'Avatar/USER_FETCH_ERROR',
  payload: { error: string },
};

declare type UserAction =
  | UpdateUsernameAction
  | FetchUserRequestAction
  | FetchUserSuccessAction
  | FetchUserErrorAction;
<% } %>

