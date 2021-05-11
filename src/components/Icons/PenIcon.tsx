import React from 'react';

import { Icon as Svg } from './Icon';

interface PenIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const PenIcon: React.FC<PenIconProps> = ({ className, ...props }) => {
  return (
    <Svg width='24' height='24' viewBox='0 0 24 24' className={className} {...props}>
      <path
        d='M18.9612 3.67601L20.3205 5.03525C21.3247 6.03946 21.3247 7.66759 20.3205 8.6718L18.0001 10.9922L8.69702 20.2953C7.97367 21.0186 6.99262 21.425 5.96968 21.425H4.32868C3.35823 21.425 2.57153 20.6383 2.57153 19.6678V18.0269C2.57153 17.0039 2.97794 16.0227 3.70134 15.2994L13.0047 5.99657L13.0043 5.99638L15.3247 3.67601C16.3289 2.6718 17.957 2.6718 18.9612 3.67601ZM14.143 7.28266L4.91349 16.5116C4.5116 16.9135 4.28582 17.4585 4.28582 18.0269V19.6678C4.28582 19.6915 4.30501 19.7107 4.32868 19.7107H5.96968C6.53798 19.7107 7.08301 19.4849 7.48487 19.0831L16.7144 9.85409L14.143 7.28266ZM16.5369 4.88819L15.4287 5.99638L18.0001 8.56781L19.1083 7.45962C19.443 7.12488 19.443 6.58217 19.1083 6.24743L17.7491 4.88819C17.4143 4.55345 16.8716 4.55345 16.5369 4.88819Z'
        fill='#5D6267'
      />
    </Svg>
  );
};

export default PenIcon;
