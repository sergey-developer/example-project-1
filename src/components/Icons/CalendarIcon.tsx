import React from 'react';

import { Icon as Svg } from './Icon';

export const CalendarIcon: React.FC = () => {
  return (
    <Svg width='18' height='20' viewBox='0 0 18 20' fill='none'>
      <path
        d='M6 9H4V11H6V9ZM10 9H8V11H10V9ZM14 9H12V11H14V9ZM16 2H15V0H13V2H5V0H3V2H2C0.89 2 0.00999999 2.9 0.00999999 4L0 18C0 18.5304 0.210714 19.0391 0.585786 19.4142C0.960859 19.7893 1.46957 20 2 20H16C17.1 20 18 19.1 18 18V4C18 2.9 17.1 2 16 2ZM16 18H2V7H16V18Z'
        fill='#A4B1B9'
        fillOpacity='0.5'
      />
    </Svg>
  );
};
