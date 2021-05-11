import React from 'react';
import styled, { css, useTheme } from 'styled-components/macro';

import { ColorType } from 'styles/theme';

import { Icon as Svg } from './Icon';

interface PlusIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  color?: ColorType;
}

export const PlusIcon: React.FC<PlusIconProps> = ({
  className,
  color = 'waikawaGray',

  ...props
}) => {
  const theme = useTheme();

  return (
    <Svg width='14' height='14' viewBox='0 0 14 14' className={className} {...props}>
      <path
        d='M7.90395 13.0927C7.90371 13.6028 7.50675 13.9998 6.99663 14C6.74157 14.0001 6.52908 13.901 6.35912 13.7311C6.18916 13.5611 6.09007 13.3486 6.0902 13.0936L6.09268 7.90732L0.906434 7.9098C0.651373 7.90993 0.438879 7.81084 0.26892 7.64088C0.0989608 7.47092 -0.000122338 7.25843 1.13365e-07 7.00337C0.000245017 6.49325 0.3972 6.09629 0.907322 6.09605L6.09355 6.09355L6.09605 0.907322C6.09629 0.3972 6.49325 0.000245017 7.00337 1.13372e-07C7.51349 -0.00024479 7.91005 0.396312 7.9098 0.906434L7.90732 6.09268L13.0936 6.0902C13.6037 6.08995 14.0002 6.48651 14 6.99663C13.9998 7.50675 13.6028 7.90371 13.0927 7.90395L7.90643 7.90643L7.90395 13.0927Z'
        fill={theme.colors[color]}
      />
    </Svg>
  );
};
