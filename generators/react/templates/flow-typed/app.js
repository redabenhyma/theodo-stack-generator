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

declare type History = {
  length: number,
  action: string,
  location: {
    pathname: string,
    search: string,
    hash: string,
    state: string,
  },
  push: (path: string) => void,
  replace: (path: string) => void,
  go: (n: number) => void,
  goBack: () => void,
  goForward: () => void,
  block: (prompt: any) => void,
};
