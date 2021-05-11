import { nanoid } from '@reduxjs/toolkit';
import React, { useMemo } from 'react';

import { GoogleAutocompleteInput } from 'components/Inputs';
import { GoogleAutocompliteTypes } from 'components/Inputs/GoogleAutocompleteInput';
import { Nullable } from 'shared/types';

import { Container, Input, Label } from './InputWithLabel.styled';

type InputType = 'text' | 'addressAutocomplete';

interface InputWithLabelProps {
  className?: string;
  label?: string;
  mask?: string;
  labelNode?: React.ReactElement;
  edit?: boolean;
  value?: string;
  placeholder?: string;
  onlyMobile?: boolean;
  type?: InputType;
  name?: string;
  error?: Nullable<string>;
  autocompleteTypes?: GoogleAutocompliteTypes;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPlaceSelect?: (place: google.maps.places.PlaceResult) => void;
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  className,
  label,
  value,
  placeholder,
  edit,
  name,
  type = 'text',
  onChange = () => {},
  onlyMobile = false,
  onPlaceSelect = () => {},
  error,
  labelNode,
  autocompleteTypes,
  mask
}) => {
  const id = useMemo(nanoid, []);

  return (
    <Container className={className} onlyMobile={onlyMobile}>
      {labelNode ? (
        React.cloneElement(
          labelNode,
          {
            htmlFor: id
          },
          label
        )
      ) : (
        <Label htmlFor={id} onlyMobile={onlyMobile}>
          {label}
        </Label>
      )}

      {type === 'text' && (
        <Input
          id={id}
          name={name}
          value={value}
          disabled={edit}
          onChange={onChange}
          variant='subTitleTwo'
          errorMessage={error || ''}
          placeholder={placeholder}
          mask={mask}
        />
      )}

      {type === 'addressAutocomplete' && (
        <GoogleAutocompleteInput
          placeholder={placeholder}
          autocompleteTypes={autocompleteTypes}
          id={id}
          name={name}
          value={value}
          errorMessage={error || ''}
          onSelect={onPlaceSelect}
        />
      )}
    </Container>
  );
};

export default InputWithLabel;
