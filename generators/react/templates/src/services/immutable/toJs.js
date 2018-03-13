// This Higher Order Component transforms a component props from Immutable Data Structures to JS
// For more information see below link
// https://redux.js.org/docs/recipes/UsingImmutableJS.html#use-a-higher-order-component-to-convert-your-smart-components-immutablejs-props-to-your-dumb-components-javascript-props
import React from 'react';
import { Iterable } from 'immutable';

export const toJS = WrappedComponent => wrappedComponentProps => {
  const propsJS = Object.keys(wrappedComponentProps).reduce(
    (newProps, propKey) => {
      /* eslint-disable no-param-reassign */
      newProps[propKey] = Iterable.isIterable(wrappedComponentProps[propKey])
        ? wrappedComponentProps[propKey].toJS()
        : wrappedComponentProps[propKey];
      /* eslint-enable */
      return newProps;
    },
    {},
  );

  return <WrappedComponent {...propsJS} />;
};
