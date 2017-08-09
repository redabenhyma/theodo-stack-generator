import React from 'react';
import { shallow } from 'enzyme';
import Page from './Page.component';

describe('The page component', () => {
  it('should contain one link', () => {
    const wrapper = shallow(<Page />);
    const links = wrapper.find('Link');
    expect(links).toHaveLength(1);
    const link = links.first();
    expect(link.text()).toEqual('<Link />');
    expect(link.html()).toContain('Back');
  })
})
