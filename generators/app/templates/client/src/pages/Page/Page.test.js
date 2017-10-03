import React from 'react';
import { shallow } from 'enzyme';
import Page from './Page.component';

let wrapper = null;

describe('The page component', () => {
  const props = {
    userAvatarUrl: 'url',
    intl: {
      formatMessage: jest.fn(),
    },
    fetchUser: jest.fn(),
    updateUserId: jest.fn(),
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

  it('should call updateUserId when writing in the text input', () => {
    const input = wrapper.find('input');
    expect(props.updateUserId.mock.calls.length).toBe(0);
    input.simulate('change', { target: { value: 'My new value' } });
    expect(props.updateUserId.mock.calls.length).toBe(1);
  });

  it('should call fetchUser when clicking on button', () => {
    const button = wrapper.find('button');
    expect(props.fetchUser.mock.calls.length).toBe(0);
    button.simulate('click');
    expect(props.fetchUser.mock.calls.length).toBe(1);
  });

  it('should display an image if userAvatarUrl is set', () => {
    const image = wrapper.find('img');
    expect(image).toHaveLength(1);
    expect(image.prop('src')).toBe('url');
  });

  it('should not display an image if userAvatarUrl is not set', () => {
    wrapper.setProps({ userAvatarUrl: null });
    const image = wrapper.find('img');
    expect(image).toHaveLength(0);
  });
});
