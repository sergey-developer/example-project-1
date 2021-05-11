import i18n from 'i18next';
import FetchBackend from 'i18next-fetch-backend';
import { initReactI18next } from 'react-i18next';

enum LanguageEnum {
  EN = 'en'
}

i18n
  // load translation using http -> see /public/locales
  // learn more: https://github.com/dotcore64/i18next-fetch-backend
  // React.Suspense should be used while loading a json file
  .use(FetchBackend)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init(
    {
      supportedLngs: [LanguageEnum.EN],
      // add new namespaces to "ns" array
      ns: [
        'navigation',
        'provider-profile',
        'provider-pages',
        'common',
        'modals',
        'auth',
        'errors',
        'user-pages',
        'user-personal-info',
        'user-reviews',
        'user-favorites',
        'provider-reviews',
        'dashboard'
      ],
      fallbackLng: LanguageEnum.EN,
      debug: process.env.NODE_ENV === 'development'
    },
    err => {
      if (err) {
        console.error('error while initialising i18next::: ' + JSON.stringify(err));
      }
    }
  );

export { LanguageEnum };

export default i18n;
