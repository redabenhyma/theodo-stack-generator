import React from 'react';
import Page from './Page.component';
import createComponentWithIntl from '../../utils/i18n/create-component-with-intl';

describe('The page component', () => {
  it('should renders correctly', () => {
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
    const tree = createComponentWithIntl(<Page {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  })
})
