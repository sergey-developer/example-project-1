import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Popover } from 'react-tiny-popover';
import useToggle from 'react-use/lib/useToggle';
import { useTheme } from 'styled-components';

import {
  ArrowMenu,
  Container,
  EmailLabel,
  EmailVale,
  InviteStatusLabel,
  Line,
  MenuItem,
  MenuWrapper,
  OptionButton,
  UserName
} from './ReferralsItem.styled';

interface ReferralsItemProps {
  className?: string;
}

const ReferralsItem: React.FC<ReferralsItemProps> = ({ className }) => {
  const [menuOpen, setMenuOpen] = useToggle(false);
  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);
  const theme = useTheme();
  const [translation] = useTranslation('provider-pages');

  const t = (key: string) => translation(`referralsPage.${key}`);

  return (
    <Container className={className}>
      <Line className='name'>
        <Popover
          isOpen={menuOpen}
          positions={['bottom', 'right', 'left', 'bottom']}
          align='end'
          padding={10}
          reposition={false}
          onClickOutside={closeMenu}
          content={props => (
            <ArrowMenu {...props} arrowColor={theme.colors.white} arrowSize={10}>
              <MenuWrapper>
                <MenuItem>{t('item.resendInviteLabel')}</MenuItem>
                <MenuItem $color='warn'>{t('item.declineInviteLabel')}</MenuItem>
              </MenuWrapper>
            </ArrowMenu>
          )}
        >
          <OptionButton onClick={openMenu} />
        </Popover>
        <UserName>Philipp Plein</UserName>

        <InviteStatusLabel color='grayChateau'>
          {t('item.inviteSendLabel')}
        </InviteStatusLabel>
      </Line>
      <Line>
        <EmailLabel>{t('item.emailLabel')}</EmailLabel>

        <EmailVale>PleinPh@gmail.com</EmailVale>
      </Line>
    </Container>
  );
};

export default ReferralsItem;
