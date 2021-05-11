import React from 'react';
import { useTheme } from 'styled-components';

import { Icon as Svg } from './Icon';

interface RoundCloseIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const RoundCloseIcon: React.FC<RoundCloseIconProps> = ({
  className,
  ...props
}) => {
  const theme = useTheme();

  return (
    <Svg width='24' height='24' viewBox='0 0 24 24' className={className} {...props}>
      <circle cx='12' cy='12' r='12' fill={theme.colors.warn} />
      <path
        d='M16.5514 15.1798C16.8831 15.5118 16.8831 16.0282 16.5514 16.3602C16.3856 16.5262 16.1829 16.6 15.9618 16.6C15.7407 16.6 15.538 16.5262 15.3722 16.3602L12.0002 12.985L8.62821 16.3602C8.46237 16.5262 8.2597 16.6 8.03858 16.6C7.81747 16.6 7.61479 16.5262 7.44896 16.3602C7.11729 16.0282 7.11729 15.5118 7.44896 15.1798L10.8209 11.8046L7.44896 8.4294C7.11729 8.09741 7.11729 7.58098 7.44896 7.24899C7.78063 6.917 8.29654 6.917 8.62821 7.24899L12.0002 10.6242L15.3722 7.24899C15.7039 6.917 16.2198 6.917 16.5514 7.24899C16.8831 7.58098 16.8831 8.09741 16.5514 8.4294L13.1794 11.8046L16.5514 15.1798Z'
        fill='white'
      />
    </Svg>
  );
};
