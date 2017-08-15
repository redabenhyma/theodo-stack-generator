import React from 'react';
import Page from './Page.component';
import createComponentWithIntl from '../../utils/create-component-with-intl';

describe('The page component', () => {
  it('should renders correctly', () => {
    const props = {
      intl: {
        formatMessage: jest.fn(),
      },
    }
    const tree = createComponentWithIntl(<Page {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  })
})
