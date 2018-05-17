// @flow
/* eslint-disable no-undef, flowtype/delimiter-dangle */

declare type AvatarState = {
  username: ?string,
  userAvatarUrl: ?string,
};

declare type Store = {
  avatar: AvatarState,
  runSaga?: any,
  asyncReducers?: any,
};
