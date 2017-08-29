import React from 'react';
import { shallow } from 'enzyme';
import Page from './Page.component';

let wrapper = null;

describe('The page component', () => {
  const props = {
    intl: {
      formatMessage: jest.fn(),
    },
  };
  beforeEach(() => {
    wrapper = shallow(<Page {...props} />);
  });

  it('should contain one link', () => {
    const links = wrapper.find('Link');
    expect(links).toHaveLength(1);
    const link = links.first();
    expect(link.text()).toEqual('<Link />');
    expect(link.prop('to')).toEqual('/');
  });
});
