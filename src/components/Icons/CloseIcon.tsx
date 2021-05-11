import React from 'react';
import { useTheme } from 'styled-components/macro';

import { ColorType } from 'styles/theme';

import { Icon as Svg } from './Icon';

type IconSize = 'default' | 'small';

interface CloseIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  color?: ColorType;
  size?: IconSize;
}

export const CloseIcon: React.FC<CloseIconProps> = ({
  className,
  color,
  size = 'default',
  ...props
}) => {
  const theme = useTheme();

  const colorValue = color ? theme.colors[color] : theme.colors.warn;

  if (size === 'default') {
    return (
      <Svg
        width='18'
        height='18'
        viewBox='0 0 18 18'
        className={className}
        {...props}
      >
        <rect
          y='16.6666'
          width='23.5702'
          height='1.88562'
          rx='0.942809'
          transform='rotate(-45 0 16.6666)'
          fill={colorValue}
        />
        <rect
          width='23.5702'
          height='1.88562'
          rx='0.942809'
          transform='matrix(-0.707107 -0.707107 -0.707107 0.707107 18 16.6666)'
          fill={colorValue}
        />
      </Svg>
    );
  }

  if (size === 'small') {
    return (
      <Svg
        width='13'
        height='13'
        viewBox='0 0 13 13'
        className={className}
        {...props}
      >
        <path
          d='M12.6631 11.0768C13.1123 11.5264 13.1123 12.2257 12.6631 12.6753C12.4386 12.9001 12.1641 13 11.8647 13C11.5653 13 11.2908 12.9001 11.0662 12.6753L6.5 8.10471L1.93377 12.6753C1.7092 12.9001 1.43474 13 1.13532 13C0.835893 13 0.561433 12.9001 0.336864 12.6753C-0.112272 12.2257 -0.112272 11.5264 0.336864 11.0768L4.90307 6.50624L0.336864 1.93564C-0.112272 1.48607 -0.112272 0.78674 0.336864 0.337173C0.786001 -0.112395 1.48463 -0.112395 1.93377 0.337173L6.5 4.90777L11.0662 0.337173C11.5154 -0.112395 12.214 -0.112395 12.6631 0.337173C13.1123 0.78674 13.1123 1.48607 12.6631 1.93564L8.0969 6.50624L12.6631 11.0768Z'
          fill={colorValue}
        />
      </Svg>
    );
  }
  return null;
};
