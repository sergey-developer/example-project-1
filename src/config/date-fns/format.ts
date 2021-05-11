import _format from 'date-fns/format';

import { LanguageEnum } from '../i18n';
import locales from './locales';

const format = (
  date: Date | number,
  formatStr: string,
  locale: LanguageEnum
): string => {
  return _format(date, formatStr, {
    locale: locales[locale]
  });
};

export default format;
