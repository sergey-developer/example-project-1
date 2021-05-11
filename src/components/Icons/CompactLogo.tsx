import React from 'react';

import { Icon as Svg } from './Icon';

interface CompactLogoProps {
  className?: string;
}

export const CompactLogo: React.FC<CompactLogoProps> = ({ className, ...props }) => {
  return (
    <Svg width='44' height='44' viewBox='0 0 44 44' className={className} {...props}>
      <path
        d='M44 21.9975C44.0005 26.3488 42.7106 30.6025 40.2936 34.2207C37.8765 37.8389 34.4407 40.6591 30.4208 42.3246C26.4008 43.9901 21.9773 44.4262 17.7096 43.5776C13.4418 42.729 9.52155 40.6339 6.44454 37.5572C3.36754 34.4806 1.272 30.5606 0.422917 26.2929C-0.42616 22.0253 0.00936517 17.6017 1.67442 13.5815C3.33947 9.56142 6.15926 6.12534 9.7772 3.70784C13.3951 1.29034 17.6487 2.82035e-08 22 0C27.8343 -3.7816e-08 33.4297 2.31751 37.5555 6.44276C41.6812 10.568 43.9993 16.1632 44 21.9975ZM22 7.19139C19.0709 7.1909 16.2075 8.05905 13.7718 9.68605C11.3362 11.313 9.43775 13.6258 8.31661 16.3318C7.19548 19.0379 6.902 22.0156 7.47332 24.8884C8.04463 27.7612 9.45506 30.4001 11.5262 32.4713C13.5974 34.5424 16.2363 35.9529 19.1091 36.5242C21.9819 37.0955 24.9596 36.802 27.6657 35.6809C30.3717 34.5597 32.6845 32.6613 34.3115 30.2257C35.9385 27.79 36.8066 24.9266 36.8061 21.9975C36.8054 18.0709 35.2453 14.3053 32.4688 11.5287C29.6922 8.75219 25.9266 7.19205 22 7.19139Z'
        fill='#003E52'
      />
      <path
        d='M34.8467 29.3618C33.2214 32.1982 30.7033 34.4171 27.685 35.6725C24.6667 36.9279 21.3177 37.1493 18.1604 36.3022C15.003 35.4551 12.2147 33.587 10.2302 30.9892C8.24573 28.3915 7.17657 25.2101 7.18945 21.9411C7.20232 18.6721 8.29652 15.4993 10.3014 12.9173C12.3063 10.3352 15.1093 8.4892 18.2732 7.66696C21.4371 6.84472 24.7842 7.0925 27.7925 8.37167C30.8009 9.65083 33.3014 11.8895 34.9043 14.7386H38.887C37.2117 10.8575 34.2499 7.67247 30.5007 5.71986C26.7515 3.76726 22.4439 3.16644 18.3035 4.01861C14.1631 4.87079 10.4428 7.12388 7.76945 10.3984C5.09606 13.6729 3.63288 17.7687 3.62636 21.9959C3.61985 26.2231 5.07039 30.3234 7.73367 33.6061C10.3969 36.8888 14.1102 39.1534 18.248 40.0183C22.3857 40.8832 26.6952 40.2957 30.4504 38.3547C34.2056 36.4136 37.1772 33.2377 38.8644 29.3618H34.8467Z'
        fill='#7BA0C4'
      />
      <path
        d='M30.4553 29.3618C28.9594 31.0836 26.9729 32.3067 24.7621 32.8672C22.5512 33.4277 20.2219 33.2987 18.0865 32.4975C15.951 31.6963 14.1117 30.2613 12.8151 28.3849C11.5186 26.5085 10.8269 24.2805 10.8327 21.9998C10.8386 19.719 11.5418 17.4946 12.8479 15.6249C14.1541 13.7552 16.0008 12.3296 18.1403 11.5394C20.2798 10.7492 22.6098 10.6322 24.8177 11.204C27.0256 11.7759 29.0059 13.0092 30.4928 14.7386H34.9164C33.3136 11.8902 30.8134 9.65227 27.8055 8.37358C24.7977 7.0949 21.4513 6.84737 18.2881 7.66959C15.1249 8.49181 12.3226 10.3376 10.3181 12.9191C8.31371 15.5006 7.21978 18.6729 7.2069 21.9412C7.19403 25.2095 8.26293 28.3902 10.247 30.9875C12.231 33.5847 15.0186 35.4525 18.1753 36.2996C21.3319 37.1467 24.6802 36.9256 27.698 35.6706C30.7158 34.4157 33.2336 32.1975 34.8588 29.3618H30.4553Z'
        fill='#99E6D8'
      />
    </Svg>
  );
};
