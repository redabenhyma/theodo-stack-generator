import React from 'react';
import Root from 'components/Root/Root.component';
import { toJS } from 'services/immutable/toJs';
import { Map } from 'immutable';

describe('toJS', () => {
  it('should return a wrapped component with props', () => {
    const props = {
      fakeProd: 'fakeProd',
      fakeObject: {
        fakerProp: 'fakerProp',
      },
      fakeMap: new Map(),
    };

    const expectedProps = {
      fakeProd: 'fakeProd',
      fakeObject: {
        fakerProp: 'fakerProp',
      },
      fakeMap: {},
    };

    expect(toJS(Root)(props)).toEqual(<Root {...expectedProps} />);
  });
});
