import React from 'react';
import useToggle from 'react-use/lib/useToggle';

import BaseDatePicker, { BaseDatePickerProps } from './BaseDatePicker';

type DatePickerProps = BaseDatePickerProps;

const DatePicker: React.FC<DatePickerProps> = ({
  readonly,
  onDoubleClick,
  ...props
}) => {
  const [isReadonly, toggleReadonly] = useToggle(Boolean(readonly));

  React.useEffect(() => {
    toggleReadonly(readonly);
  }, [readonly]);

  const doubleClickHandler = () => {
    toggleReadonly(false);

    onDoubleClick && onDoubleClick();
  };

  return (
    <BaseDatePicker
      readonly={isReadonly}
      onDoubleClick={doubleClickHandler}
      {...props}
    />
  );
};

export default DatePicker;
