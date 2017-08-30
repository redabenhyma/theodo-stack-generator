import React from 'react';
import { shallow } from 'enzyme';
import Page from './Page.component';

let wrapper = null;

describe('The page component', () => {
  const props = {
    intl: {
      formatMessage: jest.fn(),
    },
    addItem: jest.fn(),
    items: [
      { id: 1, label: 'item 1' },
      { id: 2, label: 'item 2' },
      { id: 3, label: 'item 3' },
    ],
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

  it('should display three items', () => {
    const itemContainer = wrapper.find('.itemContainer');
    expect(itemContainer.children()).toHaveLength(3);
    expect(itemContainer.childAt(1).text()).toEqual('item 2');
  });

  it('should call addItem when clicking on button', () => {
    const button = wrapper.find('button');
    expect(props.addItem.mock.calls.length).toBe(0);
    button.simulate('click');
    expect(props.addItem.mock.calls.length).toBe(1);
  });
});
