import React from 'react';
import { useTheme } from 'styled-components';

import { ColorType } from 'styles/theme';

import { Icon as Svg } from './Icon';

interface CheckBoxIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  color?: ColorType;
}

export const CheckBoxIcon: React.FC<CheckBoxIconProps> = ({
  className,
  color,
  ...props
}) => {
  const theme = useTheme();
  const currentColor = color ? theme.colors[color] : theme.colors.warn;
  return (
    <Svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='white'
      className={className}
      {...props}
    >
      <rect
        x='0.75'
        y='0.75'
        width='18.5'
        height='18.5'
        rx='1.84091'
        stroke={currentColor}
        strokeWidth='1.5'
      />
      <path
        d='M8.40236 15C8.18629 15 7.98822 14.9308 7.82617 14.7752L4.24308 11.3343C3.91898 11.0231 3.91898 10.5389 4.24308 10.2277C4.56718 9.91643 5.07132 9.91643 5.39542 10.2277L8.42036 13.1153L15.6046 6.23343C15.9287 5.92219 16.4328 5.92219 16.7569 6.23343C17.081 6.54467 17.081 7.02882 16.7569 7.34006L8.99653 14.7752C8.81647 14.9308 8.61843 15 8.40236 15Z'
        fill={currentColor}
      />
    </Svg>
  );
};
