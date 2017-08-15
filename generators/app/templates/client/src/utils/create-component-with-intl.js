import React from 'react';
import renderer from 'react-test-renderer';
import { IntlProvider, addLocaleData } from 'react-intl';
import fr from 'react-intl/locale-data/fr';
import frMessages from '../translations/fr.json';

const locales = {
  fr: frMessages,
};


const createComponentWithIntl = (children, props = { locale: 'fr', messages: locales['fr'] }) => {
  return renderer.create(
    <IntlProvider {...props}>
      {children}
    </IntlProvider>
  );
};

export default createComponentWithIntl;
