// @flow
// This Higher Order Component transforms a component props from Immutable Data Structures to JS
// For more information see below link
// https://redux.js.org/docs/recipes/UsingImmutableJS.html#use-a-higher-order-component-to-convert-your-smart-components-immutablejs-props-to-your-dumb-components-javascript-props
import React from 'react';
import { Iterable } from 'immutable';

export const toJS = WrappedComponent => wrappedComponentProps => {
  const KEY = 0;
  const VALUE = 1;

  const propsJS = Object.entries(
    wrappedComponentProps,
  ).reduce((newProps, wrappedComponentProp) => {
    /* eslint-disable no-param-reassign */
    newProps[wrappedComponentProp[KEY]] = Iterable.isIterable(
      wrappedComponentProp[VALUE],
    )
      ? wrappedComponentProp[VALUE].toJS()
      : wrappedComponentProp[VALUE];
    /* eslint-enable */
    return newProps;
  }, {});

  return <WrappedComponent {...propsJS} />;
};
