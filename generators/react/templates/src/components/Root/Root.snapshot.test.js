import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Root from './Root.component';

describe('<Root>', () => {
  it('should renders correctly', () => {
    const props = {
      children: <div>
        <span>test</span>
      </div>
    };
    const tree = shallow(<Root {...props} />);
    expect(toJSON(tree)).toMatchSnapshot();
  });
});
