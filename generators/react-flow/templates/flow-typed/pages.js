// @flow
/* eslint-disable no-undef, flowtype/delimiter-dangle */

declare type User = {
  avatar_url?: string,
};

declare type UpdateUsernameActionType = {
  type: 'Avatar/UPDATE_USERNAME',
  payload: { username: string },
};

declare type FetchUserRequestActionType = {
  type: 'Avatar/USER_FETCH_REQUEST',
  payload: { username: string },
};

declare type FetchUserSuccessActionType = {
  type: 'Avatar/USER_FETCH_SUCCESS',
  payload: { user: User },
};

declare type FetchUserErrorActionType = {
  type: 'Avatar/USER_FETCH_ERROR',
  payload: { error: string },
};

declare type UserAction =
  | UpdateUsernameActionType
  | FetchUserRequestActionType
  | FetchUserSuccessActionType
  | FetchUserErrorActionType;
