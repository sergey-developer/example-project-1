import { ProfileAddressDto } from 'shared/types/generate';

const makeLocationAddress = (address?: ProfileAddressDto): string => {
  if (!address) return '';

  const address1 = address?.address1 ? `${address.address1} ` : '';
  const city = address?.city ? `${address.city}, ` : '';
  const state = address?.state ? `${address.state} ` : '';
  const zipCode = address?.zipCode ? `${address.zipCode}, ` : '';
  const country = address?.country ? address.country : '';

  return `${address1}${city}${state}${zipCode}${country}`;
};

export { makeLocationAddress };
