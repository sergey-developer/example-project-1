import React from 'react';

import { ReactComponent as FacebookIcon } from 'assets/icons/social/Facebook.svg';
import { ReactComponent as InstagramIcon } from 'assets/icons/social/Instagram.svg';
import { ReactComponent as LinkedInIcon } from 'assets/icons/social/LinkedIN.svg';
import { ReactComponent as RedditIcon } from 'assets/icons/social/Reddit.svg';
import { ReactComponent as TwitterIcon } from 'assets/icons/social/Twitter.svg';
import { ReactComponent as WhatsappIcon } from 'assets/icons/social/WhatsApp.svg';
import { SocialNamesEnum, SocialNamesType } from 'features/provider/constants';
import { Nullable } from 'shared/types';

type IconSize = 'sm' | 'md';

type SocialIconProps = {
  name: SocialNamesType;
  size?: IconSize;
  cursor?: boolean;
};

const sizes: Record<IconSize, number> = {
  sm: 24,
  md: 36
};

const icons: Record<SocialNamesType, Nullable<any>> = {
  [SocialNamesEnum['0']]: null,
  [SocialNamesEnum['1']]: FacebookIcon,
  [SocialNamesEnum['2']]: TwitterIcon,
  [SocialNamesEnum['3']]: InstagramIcon,
  [SocialNamesEnum['4']]: null,
  [SocialNamesEnum['5']]: null,
  [SocialNamesEnum['6']]: RedditIcon,
  [SocialNamesEnum['7']]: WhatsappIcon,
  [SocialNamesEnum['8']]: LinkedInIcon
};

const SocialIcon: React.FC<SocialIconProps> = ({ name, size = 'md', cursor }) => {
  const dimension = sizes[size];
  const Icon: React.JSXElementConstructor<any> = icons[name];

  return Icon ? (
    <Icon
      cursor={cursor ? 'pointer' : 'default'}
      width={dimension}
      height={dimension}
    />
  ) : null;
};

export default SocialIcon;
