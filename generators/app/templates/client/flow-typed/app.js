// @flow
/* eslint-disable no-undef, flowtype/delimiter-dangle */

declare type RoutingStore = {
  locationBeforeTransitions: {
    pathname: string,
    search: string,
    hash: string,
    action: string,
    key?: string,
    query: Object,
  }
};

declare type AvatarStore = {
  userAvatarUrl?: ?string,
  userId?: string,
};

declare type Store = {
  routing: RoutingStore,
  page: AvatarStore,
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
