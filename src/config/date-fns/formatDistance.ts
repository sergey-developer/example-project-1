import _formatDistance from 'date-fns/formatDistance';

import { LanguageEnum } from '../i18n';
import locales from './locales';

const formatDistance = (
  date: Date | number,
  baseDate: Date | number,
  options: {
    locale: LanguageEnum;
    addSuffix?: boolean;
    includeSeconds?: boolean;
  }
): string => {
  return _formatDistance(date, baseDate, {
    locale: locales[options.locale],
    addSuffix: options.addSuffix,
    includeSeconds: options.includeSeconds
  });
};

export default formatDistance;
