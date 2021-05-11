import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import useClickAway from 'react-use/lib/useClickAway';
import useToggle from 'react-use/lib/useToggle';

import { Typography } from 'components/Typography';
import { ROUTES } from 'shared/constants';

import {
  Container,
  CreateNewLink,
  ItemWrapper,
  NavItem,
  NavLink,
  NavList,
  NavWrapper,
  TextWrapper,
  ToggleMenuButton
} from './HeaderDropdownNav.styled';

export type NavItemType = {
  label: string;
  to: string;
};

export interface HeaderDropdownNavProps {
  items: NavItemType[];
  isActive: boolean;
}

export const HeaderDropdownNav: React.FC<HeaderDropdownNavProps> = ({
  children,
  items,
  isActive
}) => {
  const history = useHistory();
  const [t] = useTranslation('navigation');
  const menuRef = React.useRef(null);
  const [menuOpened, toggleMenuOpened] = useToggle(false);

  useClickAway(menuRef, () => {
    menuOpened && toggleMenuOpened(false);
  });

  const handleCreateNewProvider = () => {
    toggleMenuOpened(false);
    history.push(ROUTES.PROVIDER_CREATE);
  };

  return (
    <Container ref={menuRef}>
      <ItemWrapper onClick={() => toggleMenuOpened()}>
        <TextWrapper isActive={isActive}>
          <Typography color='glacier' variant='body' tag='span'>
            {children}
          </Typography>
        </TextWrapper>

        <ToggleMenuButton $open={menuOpened} isActive={isActive} />
      </ItemWrapper>

      <NavWrapper $open={menuOpened}>
        <NavList>
          {items.map(({ label, to }, index) => (
            <NavItem key={index} onClick={() => toggleMenuOpened(false)}>
              <NavLink to={to}>
                <Typography variant='body2' color='sherpaBlue' tag='span'>
                  {label}
                </Typography>
              </NavLink>
            </NavItem>
          ))}

          <NavItem>
            <CreateNewLink>
              <Typography
                variant='h6'
                color='sherpaBlue'
                tag='span'
                onClick={handleCreateNewProvider}
              >
                {t('createNewProvider')}
              </Typography>
            </CreateNewLink>
          </NavItem>
        </NavList>
      </NavWrapper>
    </Container>
  );
};
