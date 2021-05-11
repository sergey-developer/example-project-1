import React, { useEffect, useRef, useState } from 'react';
import InputMask from 'react-input-mask';
import useClickAway from 'react-use/lib/useClickAway';
import useToggle from 'react-use/lib/useToggle';

import { Nullable } from 'shared/types';
import { ColorType, VariantTypography } from 'styles/theme';

import { Typography } from '../Typography';
import {
  AutoCompleteItem,
  AutoCompleteList,
  ErrorMessage,
  IconContainer,
  Input,
  Placeholder,
  TextInputSize,
  Wrapper
} from './TextInput.styled';

interface TextInputProps {
  mask?: string;
  className?: string;
  edit?: boolean;
  disabled?: boolean;
  name?: string;
  value?: string | null | undefined | number;
  size?: TextInputSize;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onDoubleClick?: () => void;
  placeholder?: string;
  color?: ColorType;
  variant?: VariantTypography;
  readOnly?: boolean;
  options?: string[];
  spaceBottom?: number;
  id?: string;
  errorMessage?: Nullable<string>;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  type?: HTMLInputElement['type'];
}

export const TextInput: React.FC<TextInputProps> = ({
  className,
  type = 'text',
  edit = true,
  size = 'medium',
  disabled,
  onDoubleClick = () => {},
  placeholder,
  value,
  color,
  variant = 'h6',
  options,
  name = '',
  onChange = () => {},
  onBlur = () => {},
  spaceBottom,
  icon,
  rightIcon,
  errorMessage,
  mask,
  ...props
}) => {
  const [focus, setFocus] = useToggle(false);
  const [typingValue, setTypingValue] = useState('');
  const [optionOpen, setOptionOpen] = useToggle(false);
  const wrapperRef = useRef(null);

  useClickAway(wrapperRef, () => {
    setOptionOpen(false);
  });

  useEffect(() => {
    if (focus) {
      setOptionOpen(true);
      setTypingValue(value?.toString() || '');
    }
  }, [focus]);

  const handleFocus = () => setFocus(true);

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocus(false);
    onBlur && onBlur(event);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event?.target?.value;
    setTypingValue(value);
    onChange(event);
  };

  const handlePromptClick = (value: string) => () => {
    onChange({
      //@ts-ignore
      target: {
        name,
        value
      }
    });
    setOptionOpen(false);
    setTypingValue('');
  };

  const optionsFilter =
    options?.filter(
      item =>
        item.toLocaleLowerCase().includes(typingValue.toLocaleLowerCase()) &&
        item.toLocaleLowerCase() !== typingValue.toLocaleLowerCase()
    ) || [];
  const isOptionsOpen = options && !!optionsFilter?.length && optionOpen;

  return (
    <Wrapper className={className} ref={wrapperRef} $spaceBottom={spaceBottom}>
      {!!icon && <IconContainer position='left'>{icon}</IconContainer>}

      {edit && !disabled ? (
        mask ? (
          <InputMask
            mask={mask}
            value={value || ''}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          >
            {(inputProps: any) => (
              <Input
                {...inputProps}
                type={type}
                $size={size}
                placeholder={placeholder}
                $color={color}
                name={name}
                $optionOpen={isOptionsOpen}
                withIcon={!!icon}
                hasError={!!errorMessage}
              />
            )}
          </InputMask>
        ) : (
          <Input
            type={type}
            value={String(value || '')}
            $size={size}
            placeholder={placeholder}
            $color={color}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            name={name}
            $optionOpen={isOptionsOpen}
            withIcon={!!icon}
            hasError={!!errorMessage}
            {...props}
          />
        )
      ) : (
        <Placeholder
          onDoubleClick={onDoubleClick}
          $size={size}
          $disabled={disabled}
          $variant={variant}
          withIcon={!!icon}
        >
          {value || placeholder}
        </Placeholder>
      )}

      {isOptionsOpen && (
        <AutoCompleteList>
          {optionsFilter.map((option, index) => (
            <AutoCompleteItem key={index} onClick={handlePromptClick(option)}>
              {option}
            </AutoCompleteItem>
          ))}
        </AutoCompleteList>
      )}

      {!!rightIcon && <IconContainer position='right'>{rightIcon}</IconContainer>}

      {errorMessage && (
        <ErrorMessage>
          <Typography variant='caption' color='warn'>
            {errorMessage}
          </Typography>
        </ErrorMessage>
      )}
    </Wrapper>
  );
};
