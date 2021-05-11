//@ts-nocheck
import { SocialNamesEnum } from 'features/provider/constants';
import { ProfileLocationAttributesDto } from 'shared/types/generate';
import { AcceptingNewPatientsStatus } from 'shared/types/model/common/AcceptingNewPatientsStatus';

import {
  LocationEditInitialValues,
  defaultWorkingDay,
  initialValueLocationEdit,
  workDaysItems
} from '../LocationEditModal';

export const dataConverter = (
  data: ProfileLocationAttributesDto
): LocationEditInitialValues => {
  const {
    acceptingNewPatients: acceptingNewPatientsValue,
    workingHours: workingHoursValue,
    socialLinks: socialLinksValue,
    ...rest
  } = data;

  let acceptingNewPatients;
  if (acceptingNewPatientsValue === AcceptingNewPatientsStatus.Accept) {
    acceptingNewPatients = true;
  }

  if (acceptingNewPatientsValue === AcceptingNewPatientsStatus.NotAccept) {
    acceptingNewPatients = false;
  }

  const workingHours: LocationEditInitialValues['workingHours'] = workDaysItems.reduce(
    (acc, day) => {
      const dayValue = workingHoursValue?.find(item => item.day === day);
      if (dayValue) {
        acc[day] = {
          checked: true,
          from: dayValue.from || defaultWorkingDay.from,
          to: dayValue.to || defaultWorkingDay.to
        };
      } else {
        acc[day] = defaultWorkingDay;
      }

      return acc;
    },
    {} as LocationEditInitialValues['workingHours']
  );

  const socialLinks: LocationEditInitialValues['socialLinks'] = socialLinksValue?.reduce(
    (acc, item) => {
      const socialType = item?.socialType;
      const url = item?.url;
      const socialName = SocialNamesEnum[socialType];
      acc[socialName] = url;
      return acc;
    },
    {}
  );

  return {
    ...rest,
    acceptingNewPatients,
    workingHours: { ...initialValueLocationEdit.workingHours, ...workingHours },
    socialLinks: { ...initialValueLocationEdit.socialLinks, ...socialLinks }
  };
};
