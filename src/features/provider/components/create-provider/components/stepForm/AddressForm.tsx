import React from 'react';
import { useTranslation } from 'react-i18next';
import { isConstructorDeclaration } from 'typescript';

import { InputWithLabel } from 'components/InputWithLabel';
import { Typography } from 'components/Typography';
import { Nullable } from 'shared/types';
import { googleAddressToMap } from 'shared/utils/gooleMapUtils';
import { CreateProviderError, SetLocationPayload } from 'state/ducks/createProvider';

import { Container } from './AddressForm.styled';
import { ActionW, BackButton, InputLabel, NextButton } from './Common.styled';

interface AddressFormProps {
  className?: string;
  onSelectLocation: (payload: SetLocationPayload) => void;
  error: Nullable<CreateProviderError>;
  value: string;
  onGoNextStep: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
  className,
  error,
  onSelectLocation,
  value,
  onGoNextStep
}) => {
  const [translation] = useTranslation('provider-pages');
  const t = (key: string) => translation(`createProviderPage.${key}`);

  const handlePlaceSelect = (place: google.maps.places.PlaceResult) => {
    const addressMap = googleAddressToMap(place);
    const lat = place.geometry?.location?.lat();
    const lng = place.geometry?.location?.lng();
    const streetNumber = addressMap.get('street_number')?.short_name || '';
    const routeName = addressMap.get('route')?.long_name || '';
    const address1 = `${streetNumber} ${routeName}`;
    const city = addressMap.get('locality')?.long_name || '';
    const zipCode = addressMap.get('postal_code')?.short_name || '';
    const zipCodeFull = addressMap.get('postal_code')?.long_name || '';
    const country = addressMap.get('country')?.short_name || '';
    const state = addressMap.get('administrative_area_level_1')?.short_name;

    const addressFull = Boolean(
      lat &&
        lng &&
        streetNumber &&
        routeName &&
        city &&
        zipCode &&
        zipCodeFull &&
        country &&
        state
    );

    onSelectLocation({
      address: {
        address1,
        city,
        zipCode,
        zipCodeFull,
        country,
        state
      },
      geoPoint: {
        lat,
        lng
      },
      addressFull
    });
  };

  return (
    <Container className={className}>
      <InputWithLabel
        onlyMobile
        labelNode={<InputLabel />}
        autocompleteTypes='address'
        onPlaceSelect={handlePlaceSelect}
        type='addressAutocomplete'
        label={t('locationField.label')}
        value={value}
        placeholder={t('locationField.placeholder')}
        error={
          !!error
            ? error?.message
              ? error?.message
              : t(`errors.${error?.type}`)
            : ''
        }
      />

      <ActionW>
        <NextButton disabled={!!error || !value} onClick={onGoNextStep}>
          {t('nextBtnLabel')}
        </NextButton>
      </ActionW>
    </Container>
  );
};

export default AddressForm;
