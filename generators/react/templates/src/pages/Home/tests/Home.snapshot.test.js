// @flow
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import historyProp from '__mocks__/historyProp';
import Home from '../Home';

describe('<Home>', () => {
  it('should render correctly', () => {
    const props = { history: historyProp };

    const tree = shallow(<Home {...props} />);
    expect(toJSON(tree)).toMatchSnapshot();
  });
});
