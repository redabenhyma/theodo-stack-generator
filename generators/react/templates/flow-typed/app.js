// @flow
/* eslint-disable no-undef, flowtype/delimiter-dangle */

declare type AvatarStore = {
  userAvatarUrl?: ?string,
  userId?: string,
};

declare type Store = {
  avatar: AvatarStore,
};

declare type History = {
  createHref: () => {},
  createKey: () => {},
  createLocation: () => {},
  createPath: () => {},
  getCurrentLocation: () => {},
  go: () => {},
  goBack: () => {},
  goForward: () => {},
  listen: () => {},
  listenBefore: () => {},
  push: () => {},
  replace: () => {},
  transitionTo: () => {},
  unsubscribe: () => {},
};
