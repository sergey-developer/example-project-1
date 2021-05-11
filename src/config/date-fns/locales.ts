import enUS from 'date-fns/locale/en-US';

import { LanguageEnum } from '../i18n';

const locales: Record<LanguageEnum, Locale> = {
  [LanguageEnum.EN]: enUS
};

export default locales;
