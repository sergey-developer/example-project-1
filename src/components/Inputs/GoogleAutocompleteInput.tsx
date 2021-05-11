import React, { useEffect, useRef } from 'react';
import useUpdateEffect from 'react-use/lib/useUpdateEffect';

import { GOOGLE_PLACES_API_KEY } from 'config/google-autocomplete/config';
import { useScript } from 'shared/hooks';
import { Nullable } from 'shared/types';
import { VariantTypography } from 'styles/theme';

import { AutoCompleteInput, ErrorLabel } from './GoogleAutocompleteInput.styled';
import { Placeholder, TextInputSize, Wrapper } from './TextInput.styled';

type GoogleAutocompleteInputProps = {
  id?: string;
  edit?: boolean;
  disabled?: boolean;
  name?: string;
  autocompleteTypes?: GoogleAutocompliteTypes;
  value?: Nullable<string>;
  size?: TextInputSize;
  onSelect?: (place: google.maps.places.PlaceResult) => void;
  onDoubleClick?: () => void;
  placeholder?: string;
  variant?: VariantTypography;
  className?: string;
  errorMessage?: string;
};

export type GoogleAutocompliteTypes = keyof typeof autocompliteTypesMap;

const autocompliteTypesMap = {
  address: ['address'],
  regions: ['(regions)']
};

const GoogleAutocompleteInput: React.FC<GoogleAutocompleteInputProps> = ({
  edit = true,
  size = 'medium',
  disabled,
  onDoubleClick = () => {},
  autocompleteTypes = 'regions',
  placeholder,
  value,
  variant = 'h6',
  onSelect = () => {},
  className,
  errorMessage,
  ...props
}) => {
  const [data, setData] = React.useState(value);
  // const [loaded] = useScript(
  //   `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_PLACES_API_KEY}&libraries=places`
  // );

  useUpdateEffect(() => {
    setData(value);
  }, [value]);

  const handleSelect = (place: google.maps.places.PlaceResult) => {
    onSelect(place);
  };

  return (
    <Wrapper>
      {edit && !disabled ? (
        <AutoCompleteInput
          // apiKey={GOOGLE_PLACES_API_KEY}
          $size={size}
          placeholder={placeholder}
          onPlaceSelected={handleSelect}
          types={autocompliteTypesMap[autocompleteTypes]}
          value={data}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setData(event.target.value)
          }
          $error={!!errorMessage}
          className={className}
          {...props}
        />
      ) : (
        <Placeholder
          onDoubleClick={onDoubleClick}
          $size={size}
          $disabled={disabled}
          $variant={variant}
          className={className}
        >
          {value || placeholder}
        </Placeholder>
      )}
      {errorMessage && <ErrorLabel>{errorMessage}</ErrorLabel>}
    </Wrapper>
  );
};

export default GoogleAutocompleteInput;
