// @flow
/* eslint-disable no-undef, flowtype/delimiter-dangle */

declare type AvatarState = {
  userId: string | null,
  userAvatarUrl: string | null,
};

declare type Store = {
  avatar: AvatarState,
  runSaga?: any,
  asyncReducers?: any,
};
