// @flow
/* eslint-disable no-undef, flowtype/delimiter-dangle */
import type { IndexedIterable } from 'immutable';

declare type AvatarStore = IndexedIterable;

declare type Store = {
  avatar: AvatarStore,
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
