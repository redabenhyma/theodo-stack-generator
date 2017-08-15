import React from 'react';
import Page from './Page.component';
import renderer from 'react-test-renderer';

describe('The page component', () => {
  it('should renders correctly', () => {
    const tree =  renderer.create(<Page />).toJSON();
    expect(tree).toMatchSnapshot();
  })
})
