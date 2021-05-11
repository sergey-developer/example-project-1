import React from 'react';

import { Icon as Svg } from './Icon';

interface IBurgerIconProps {
  className?: string;
  height?: number;
}

export const BurgerIcon: React.FC<IBurgerIconProps> = ({ className, ...props }) => {
  return (
    <Svg width='25' height='16' viewBox='0 0 25 16' className={className} {...props}>
      <rect width='25' height='2' rx='1' fill='#003E52' />
      <rect y='7' width='25' height='2' rx='1' fill='#003E52' />
      <rect y='14' width='25' height='2' rx='1' fill='#003E52' />
    </Svg>
  );
};
