import React from 'react';

import { Icon as Svg } from './Icon';

interface PlaceIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const PlaceIcon: React.FC<PlaceIconProps> = ({ className, ...props }) => {
  return (
    <Svg width='29' height='41' viewBox='0 0 29 41' className={className} {...props}>
      <path
        d='M0 14.75C0 20.314 3.94272 28.4127 11.8282 39.0459L11.8281 39.046C12.82 40.3835 14.7084 40.6637 16.0459 39.6718C16.2842 39.4951 16.4951 39.2843 16.6718 39.046C24.5573 28.4127 28.5 20.314 28.5 14.75C28.5 6.87179 22.1282 0.5 14.25 0.5C6.37179 0.5 0 6.87179 0 14.75ZM9 14.75C9 11.852 11.352 9.5 14.25 9.5C17.148 9.5 19.5 11.852 19.5 14.75C19.5 17.648 17.148 20 14.25 20C11.352 20 9 17.648 9 14.75Z'
        fill='#ED91A8'
      />
    </Svg>
  );
};

export default PlaceIcon;
