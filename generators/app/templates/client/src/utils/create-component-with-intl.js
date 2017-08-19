import React from 'react';
import renderer from 'react-test-renderer';
import { IntlProvider, addLocaleData } from 'react-intl';
import fr from 'react-intl/locale-data/fr';
import frMessages from '../translations/fr.json';

import { flattenMessages } from './intl';

const locales = {
  fr: flattenMessages(frMessages),
};


const createComponentWithIntl = (children, props = { locale: 'fr', messages: locales['fr'] }) => {
  return renderer.create(
    <IntlProvider {...props}>
      {children}
    </IntlProvider>
  );
};

export default createComponentWithIntl;
