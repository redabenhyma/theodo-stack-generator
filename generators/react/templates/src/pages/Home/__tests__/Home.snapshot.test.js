// @flow
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import Home from '../Home';

describe('<Home>', () => {
  it('should render correctly', () => {
    const tree = shallow(<Home />);
    expect(toJSON(tree)).toMatchSnapshot();
  });
});
