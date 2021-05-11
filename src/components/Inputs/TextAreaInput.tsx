import React from 'react';

import { Typography } from 'components/Typography';
import { Nullable } from 'shared/types';

import {
  Container,
  ErrorMessage,
  Placeholder,
  TextArea
} from './TextAreaInput.styled';

interface TextAreaInputProps {
  edit?: boolean;
  className?: string;
  height?: number;
  value?: string;
  name?: string;
  placeholder?: string;
  errorMessage?: Nullable<string>;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onDoubleClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const TextAreaInput: React.FC<TextAreaInputProps> = ({
  edit = true,
  errorMessage,
  height,
  className,
  value,
  name,

  placeholder,
  onChange = () => {},
  onBlur = () => {},
  onDoubleClick = () => {}
}) => {
  return (
    <Container className={className}>
      {edit ? (
        <TextArea
          $height={height}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          hasError={!!errorMessage}
        />
      ) : (
        <Placeholder $height={height} onDoubleClick={onDoubleClick}>
          {value || placeholder}
        </Placeholder>
      )}

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Container>
  );
};
