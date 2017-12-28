// @flow
/* eslint-disable no-undef, flowtype/delimiter-dangle */

<% if (exampleRequired) { %>
  declare type AvatarStore = {
    userAvatarUrl?: ?string,
    userId?: string,
  };
<% } %>

<% if (exampleRequired) { %><% } %>
declare type Store = {
  <% if (exampleRequired) { %>avatar: AvatarStore,<% } %>
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
