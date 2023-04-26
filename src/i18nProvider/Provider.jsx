import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';

import { LOCALES } from './constants';
import messages from './messages';

const Provider = ({ children, locale }) => (
  <IntlProvider
    textComponent={Fragment}
    locale={locale}
    messages={messages[locale]}
  >
    {children}
  </IntlProvider>
);

Provider.displayName = 'I18nProvider';

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  locale: PropTypes.oneOf(Object.values(LOCALES)),
};

Provider.defaultProps = {
  locale: LOCALES.ENGLISH,
};

// export const LocalesModeContext = createContext({
//   toggleLocalesMode: () => {},
// });

// export const useLocate = () => {
//   const [locale, setLocale] = useState(LOCALES.ENGLISH);

//   const localesMode = useMemo(
//     () => ({
//       toggleLocalesMode: () =>
//       setLocale((prev) => (prev === LOCALES.ENGLISH ? LOCALES.THAILAND : LOCALES.ENGLISH)),
//     }),
//     []
//   );

//   return [locale, localesMode];
// };

export default Provider;
