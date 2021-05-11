import { ProfileAddressDto } from 'shared/types/generate';
import { pick } from 'shared/utils/pick';

import { sliceName } from './createProviderSlice';
import { CreateProviderState, createProviderState } from './state';

export const saveDataToSessionStore = (data: CreateProviderState) => {
  const serialize = JSON.stringify(data);
  sessionStorage.setItem(sliceName, serialize);
};

export const loadDataFromSessionStore = (): CreateProviderState => {
  const serialize = sessionStorage.getItem(sliceName);
  if (serialize) {
    try {
      return JSON.parse(serialize) || createProviderState;
    } catch {
      return createProviderState;
    }
  } else {
    return createProviderState;
  }
};

export const isAddressFull = (address: ProfileAddressDto): boolean => {
  const requireAddressField = pick(
    address,
    'address1',
    'city',
    'country',
    'state',
    'zipCode',
    'zipCodeFull'
  );

  return Object.keys(requireAddressField).every(
    key => requireAddressField[key as keyof typeof requireAddressField]
  );
};
