// @flow
import React from 'react';
import { shallow } from 'enzyme';

import historyProp from '__mocks__/historyProp';
import Home from '../Home';

let wrapper = null;

describe('The page component', () => {
  const props = { history: historyProp };

  beforeEach(() => {
    wrapper = shallow(<Home {...props} />);
  });

  it('should redirect to the /avatar page', () => {
    // $FlowFixMe
    const input = wrapper.find('button');
    expect(props.history.push.mock.calls.length).toBe(0);
    input.simulate('click');
    expect(props.history.push.mock.calls.length).toBe(1);
    expect(props.history.push.mock.calls[0][0]).toBe('/avatar');
  });
});
