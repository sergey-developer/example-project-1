import React from 'react';

import { Icon } from './Icon';

type StarIconProps = {};

export const StarIcon: React.FC<StarIconProps> = () => {
  return (
    <Icon width='18' height='18' viewBox='0 0 18 18' fill='none'>
      <path
        d='M9 0L11.3805 5.72348L17.5595 6.21885L12.8518 10.2515L14.2901 16.2812L9 13.05L3.70993 16.2812L5.14822 10.2515L0.440492 6.21885L6.61947 5.72348L9 0Z'
        fill='#99A2AD'
      />
    </Icon>
  );
};
