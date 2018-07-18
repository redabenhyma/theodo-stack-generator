// @flow
import React from 'react';

import historyProp from '__mocks__/historyProp';
import intlShape from '__mocks__/intlShape';
import createComponentWithIntl from 'services/i18n/create-component-with-intl';
import Avatar from '../Avatar';

describe('The page component', () => {
  it('should render correctly', () => {
    const props = {
      intl: intlShape,
      history: historyProp,
      fetchUser: jest.fn(),
      updateUsername: jest.fn(),
      userAvatarUrl: 'https://avatars1.githubusercontent.com/u/9215726?v=4',
      username: 'juste_leblanc',
    };
    const tree = createComponentWithIntl(<Avatar {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
