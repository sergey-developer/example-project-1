import { ProfileAddressDto } from 'shared/types/generate';

export const googleAddressToMap = (place: google.maps.places.PlaceResult) => {
  const address = place?.address_components || [];
  const addressMap = new Map<
    string,
    {
      long_name?: string;
      short_name?: string;
    }
  >();
  address.forEach(item => {
    item.types.forEach(type => {
      addressMap.set(type, {
        long_name: item.long_name,
        short_name: item.short_name
      });
    });
  });
  return addressMap;
};
