import React from 'react';

import { BurgerButton } from 'components/Buttons';
import { CompactLogo, FullLogo } from 'components/Icons';
import { MAIN_SITE_URL } from 'config/common';

import { HeaderNavigation } from '../HeaderNavigation';
import { NotificationBell } from '../NotificationBell';
import {
  HeaderContainer,
  HeaderLeftPart,
  HeaderMiddlePart,
  HeaderRightPart,
  LanguageSelect,
  LinkStyled,
  MobileNavigation,
  UserNavStyled,
  Wrapper
} from './Header.styled';

interface HeaderProps {
  className?: string;
  onBurgerClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ className, onBurgerClick }) => {
  return (
    <Wrapper className={className}>
      <HeaderContainer>
        <HeaderLeftPart>
          <BurgerButton className='burger-button' onClick={onBurgerClick} />

          <LinkStyled href={MAIN_SITE_URL}>
            <FullLogo className='full-logo' />
            <CompactLogo className='compact-logo' />
          </LinkStyled>
        </HeaderLeftPart>

        <HeaderMiddlePart>
          <LanguageSelect />

          <HeaderNavigation className='desktop-navigation' />
        </HeaderMiddlePart>

        <HeaderRightPart>
          <UserNavStyled />
          <NotificationBell />
        </HeaderRightPart>
      </HeaderContainer>

      <MobileNavigation mobileMod />
    </Wrapper>
  );
};
