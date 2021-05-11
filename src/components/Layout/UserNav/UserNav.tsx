import React from 'react';
import { useSelector } from 'react-redux';
import useClickAway from 'react-use/lib/useClickAway';
import useToggle from 'react-use/lib/useToggle';

import { Typography } from 'components/Typography';
import { ROUTES } from 'shared/constants/routes';
import {
  userPersonalInfoAvatarSelector,
  userPersonalInfoFullNameSelector
} from 'state/ducks/userPersonalInfo';

import {
  Avatar,
  AvatarContainer,
  Container,
  OpenCloseMenuButton,
  ProfileMenuItem,
  ProfileMenuLink,
  ProfileMenuList,
  ProfileMenuWrapper,
  UserName
} from './UserNav.styled';

const userMenuList = [
  {
    label: 'My profile',
    to: ROUTES.USER_INFO
  },
  {
    label: 'Settings',
    to: ROUTES.USER_CHANGE_PASSWORD
  },
  {
    label: 'Sign Out',
    to: ROUTES.SIGN_OUT
  }
];

type UserNavProps = {
  className?: string;
};

export const UserNav: React.FC<UserNavProps> = React.memo(({ className }) => {
  const fullName = useSelector(userPersonalInfoFullNameSelector);
  const avatarUrl = useSelector(userPersonalInfoAvatarSelector);
  const [opened, toggleOpen] = useToggle(false);
  const menuRef = React.useRef(null);

  useClickAway(menuRef, () => {
    opened && toggleOpen(false);
  });

  return (
    <Container className={className} ref={menuRef}>
      {fullName && <UserName>{fullName}</UserName>}

      <AvatarContainer onClick={() => toggleOpen()}>
        <Avatar src={avatarUrl || ''} />
        <OpenCloseMenuButton $open={opened} />
      </AvatarContainer>

      <ProfileMenuWrapper $open={opened}>
        <ProfileMenuList onClick={() => toggleOpen(false)}>
          {userMenuList.map(({ label, ...rest }) => (
            <ProfileMenuItem key={label}>
              <ProfileMenuLink exact {...rest}>
                <Typography variant='body2' tag='span' color='sherpaBlue'>
                  {label}
                </Typography>
              </ProfileMenuLink>
            </ProfileMenuItem>
          ))}
        </ProfileMenuList>
      </ProfileMenuWrapper>
    </Container>
  );
});
