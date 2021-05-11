import React from 'react';
import { TFunction, useTranslation } from 'react-i18next';
import { useRouteMatch } from 'react-router-dom';

import { SidebarNavigation } from 'components/SidebarNavigation';
import { ROUTES } from 'shared/constants/routes';
import { SidebarNavItem } from 'shared/types';

import { Container } from './UserSidebar.styled';

const getDefaultNavItems = (t: TFunction<'navigation'>): SidebarNavItem[] => [
  {
    label: t('dashboard'),
    to: ROUTES.USER_DASHBOARD,
    icon: 'dashboard'
  },
  {
    label: t('personalInfo'),
    to: ROUTES.USER_INFO,
    icon: 'profile'
  },
  {
    label: t('reviews'),
    to: ROUTES.USER_REVIEWS,
    icon: 'reviews'
  },
  {
    label: t('favorites'),
    to: ROUTES.USER_FAVORITES,
    icon: 'favorites'
  },
  {
    label: t('help'),
    to: ROUTES.USER_HELP,
    icon: 'help',
    soon: true
  },
  {
    label: t('telemedicine'),
    icon: 'telemedicine',
    soon: true,
    to: '/'
  },
  {
    label: t('store'),
    icon: 'store',
    soon: true,
    to: '/'
  },
  {
    label: t('appointmentBooking'),
    icon: 'appointmentBooking',
    soon: true,
    to: '/'
  },
  {
    label: t('referrals'),
    icon: 'referrals',
    soon: true,
    to: '/'
  },
  {
    label: t('preauthorizations'),
    icon: 'preauthorizations',
    soon: true,
    to: '/'
  },
  {
    label: t('billPay'),
    icon: 'billPay',
    soon: true,
    to: '/'
  },
  {
    label: t('billShield'),
    icon: 'billShield',
    soon: true,
    to: '/'
  },
  {
    label: t('costsEstimation'),
    icon: 'costsEstimation',
    soon: true,
    to: '/'
  }
];

const getSettingsNavItems = (t: TFunction<'navigation'>): SidebarNavItem[] => [
  {
    label: t('changePassword'),
    to: ROUTES.USER_CHANGE_PASSWORD
  },
  {
    label: t('changeEmail'),
    to: ROUTES.USER_CHANGE_EMAIL
  }
];

type UserSidebarProps = {};

const UserSidebar: React.FC<UserSidebarProps> = () => {
  const { t } = useTranslation('navigation');
  const settingsRouteMatch = useRouteMatch([
    ROUTES.USER_CHANGE_EMAIL,
    ROUTES.USER_CHANGE_PASSWORD
  ]);

  const navItems = React.useMemo(() => {
    return settingsRouteMatch ? getSettingsNavItems(t) : getDefaultNavItems(t);
  }, [t, settingsRouteMatch]);

  return (
    <Container>
      <SidebarNavigation items={navItems} />
    </Container>
  );
};

export default React.memo(UserSidebar);
