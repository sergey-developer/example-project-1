import { TFunction } from 'i18next';
import * as Yup from 'yup';

import { normalizeNumber } from 'shared/utils';

import { LocationEditInitialValues } from './LocationEditModal';

export const locationValidation = (t: TFunction) => () => {
  return Yup.object().shape({
    address: Yup.mixed()
      .test(
        'address',
        t('errors:locationErrors.needFillAddress'),
        function (value: LocationEditInitialValues['address'], context) {
          if (
            value?.address1 &&
            value?.city &&
            value?.country &&
            value?.state &&
            value?.zipCode &&
            value?.zipCodeFull
          ) {
            return true;
          } else {
            return this.createError({
              path: 'address.address1',
              message: t('errors:locationErrors.needFillAddress')
            });
          }
        }
      )
      .required(),
    phone: Yup.string()
      .transform(value => normalizeNumber(value))
      .required(t('errors:locationErrors.phoneRequire'))
      .length(10, t('errors:locationErrors.phoneRequire'))
  });
};
