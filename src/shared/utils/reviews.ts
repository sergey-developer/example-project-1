import _isToday from 'date-fns/isToday';

import { ReviewListItemStatusUnion } from 'components/Reviews/ReviewList';
import { formatDate, formatDistance } from 'config/date-fns';
import { LanguageEnum } from 'config/i18n';

import { ReviewStatusUnion } from '../types/generate';

export const getDate = (date: string, locale: LanguageEnum): string => {
  const baseDate = new Date(date);
  const todayDate = new Date();
  const isToday = _isToday(baseDate);

  return isToday
    ? formatDistance(baseDate, todayDate, {
        locale,
        addSuffix: true
      })
    : formatDate(baseDate, 'd MMM, h:mm', locale);
};

/** 0 = moderation, 1 = published, 2 = declined, 3 = removed */

export const getStatus = (
  status: ReviewStatusUnion
): ReviewListItemStatusUnion | undefined => {
  if (status === 0) {
    return 'moderation';
  }
  if (status === 1) {
    return 'published';
  }
  if (status === 2) {
    return 'declined';
  }
  if (status === 3) {
    return 'removed';
  }
};
