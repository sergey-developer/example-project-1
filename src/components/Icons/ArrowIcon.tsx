import React from 'react';
import { useTheme } from 'styled-components';
import styled, { css } from 'styled-components/macro';

import { ColorType } from 'styles/theme';

import { Icon as BaseIcon } from './Icon';

const Icon = styled(BaseIcon)<{ $direction: ArrowIconProps['direction'] }>`
  ${({ $direction }) => css`
    cursor: pointer;
    ${$direction === 'left' && 'transform: rotate(90deg);'}
    ${$direction === 'right' && 'transform: rotate(-90deg);'}
  `}
`;

const arrowSize = {
  small: {
    width: 10,
    height: 6
  },
  medium: {
    width: 13,
    height: 8
  }
};

type ArrowIconProps = React.SVGProps<SVGSVGElement> & {
  className?: string;
  color?: ColorType;
  size?: keyof typeof arrowSize;
  direction?: 'left' | 'down' | 'right';
};

export const ArrowIcon: React.FC<ArrowIconProps> = ({
  className,
  color,
  size = 'medium',
  direction = 'down',
  ...props
}) => {
  const theme = useTheme();

  return (
    <Icon
      viewBox='0 0 13 8'
      className={className}
      $direction={direction}
      {...arrowSize[size]}
      {...props}
    >
      <path
        d='M6.5 8C6.25356 8 6.02951 7.90592 5.85028 7.71775L0.249306 1.60241C-0.0867528 1.22608 -0.0867583 0.638068 0.271704 0.261739C0.630167 -0.0910696 1.19028 -0.0910681 1.54874 0.285261L6.5 5.69499L11.4513 0.285261C11.7873 -0.0910681 12.3698 -0.0910696 12.7283 0.261739C13.0868 0.614547 13.0867 1.22608 12.7507 1.60241L7.14972 7.71775C6.97049 7.90592 6.74644 8 6.5 8Z'
        fill={color ? theme.colors[color] : theme.colors.grey}
      />
    </Icon>
  );
};
