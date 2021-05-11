import React from 'react';
import { Route } from 'react-router-dom';

import { ROUTES } from 'shared/constants';
import { useGreaterThan } from 'shared/hooks';

import { Container, LanguageSelect, MobileCloseIcon } from './Sidebar.styled';

const ProviderSidebar = React.lazy(
  () => import('features/provider/components/common/layout/sidebar/ProviderSidebar')
);
const UserSidebar = React.lazy(
  () => import('features/user/components/layout/sidebar/UserSidebar')
);

interface SidebarProps {
  className?: string;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  className,
  onClose = () => {}
}) => {
  const isGreaterThanMediumScreen = useGreaterThan('md');

  return (
    <Container className={className}>
      <MobileCloseIcon onClick={onClose} />

      {!isGreaterThanMediumScreen && <LanguageSelect fullWidth />}

      <Route path={ROUTES.USER_ROOT} component={UserSidebar} />
      <Route path={ROUTES.PROVIDER_ROOT} component={ProviderSidebar} />
    </Container>
  );
};
