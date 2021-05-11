import React from 'react';
import DatePicker, { DatePickerProps } from 'react-date-picker';

import { Nullable } from 'shared/types';

import { CalendarIcon } from '../Icons';
import { DatePickerWrapper } from './BaseDatePicker.styled';

export type BaseDatePickerProps = Omit<DatePickerProps, 'value' | 'onChange'> & {
  value: Nullable<string>;
  onChange: (date: Date) => void;
  onDoubleClick?: () => void;
  placeholder?: string;
  readonly?: boolean;
  hasBorder?: boolean;
  className?: string;
};

const BaseDatePicker: React.FC<BaseDatePickerProps> = ({
  className,
  onChange,
  placeholder,
  value,
  format = 'dd/MM/yyyy',
  readonly = false,
  disabled,
  hasBorder = true,
  ...props
}) => {
  const date = value ? new Date(value) : null;

  const handleChange = (date: Date | Date[]) => {
    onChange(date as Date);
  };

  return (
    <DatePickerWrapper
      className={className}
      hasValue={!!value}
      isReadonly={readonly}
      hasBorder={hasBorder}
    >
      <DatePicker
        value={date}
        onChange={readonly ? undefined : handleChange}
        dayPlaceholder={placeholder || ''}
        format={format}
        calendarIcon={readonly ? null : <CalendarIcon />}
        clearIcon={null}
        showLeadingZeros
        disabled={readonly || disabled}
        {...props}
      />
    </DatePickerWrapper>
  );
};

export default BaseDatePicker;
