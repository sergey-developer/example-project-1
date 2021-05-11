import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { generatePath } from 'react-router-dom';

import { ProviderInfo } from 'components/Provider';
import { SidebarNavigation } from 'components/SidebarNavigation';
import Spinner from 'components/Spinner/Spinner';
// import { useProviderEditProfileSlice } from 'features/provider/hooks/useProviderEditProfileSlice';
import { ROUTES } from 'shared/constants/routes';
import { SidebarNavItem } from 'shared/types';
import { providerSelector } from 'state/ducks/provider';
import {
  getProviderProfileRequest,
  providerEditProfileStateSelector
} from 'state/ducks/providerEditProfile';
import { useAppDispatch } from 'state/store';

// import { useProviderSlice } from '../../../hooks';
import { Container } from './ProviderSidebar.styled';

type ProviderSidebarProps = {
  className?: string;
};

const ProviderSidebar: React.FC<ProviderSidebarProps> = ({ className }) => {
  // useProviderSlice();
  // useProviderEditProfileSlice();

  const dispatch = useAppDispatch();
  const [t] = useTranslation('navigation');
  const { loading: providerLoading, data: provider } = useSelector(providerSelector);
  const profile = useSelector(providerEditProfileStateSelector);
  const profileAvatarUrl = profile?.data?.profile?.photoUrl;
  const providerId = provider?.id;

  useEffect(() => {
    if (providerId) {
      dispatch(
        getProviderProfileRequest({
          providerId
        })
      );
    }
  }, [providerId]);

  const navItems: SidebarNavItem[] = React.useMemo(() => {
    return provider?.id
      ? ([
          {
            label: t('dashboard'),
            icon: 'dashboard',
            to: generatePath(ROUTES.PROVIDER_DASHBOARD, {
              id: provider.id
            })
          },
          {
            label: t('profile'),
            icon: 'profile',
            to: generatePath(ROUTES.PROVIDER_PROFILE, {
              id: provider.id
            })
          },
          {
            label: t('banking'),
            icon: 'legal',
            to: generatePath(ROUTES.PROVIDER_BANKING, { id: provider.id })
          },
          {
            label: t('reviews'),
            icon: 'reviews',
            to: generatePath(ROUTES.PROVIDER_REVIEWS, { id: provider.id })
          },
          {
            label: t('locations'),
            icon: 'locations',
            to: generatePath(ROUTES.PROVIDER_LOCATIONS, { id: provider.id })
          },
          {
            label: t('team'),
            icon: 'team',
            soon: true,
            to: generatePath(ROUTES.PROVIDER_TEAM, { id: provider.id })
          },
          {
            label: t('photos'),
            icon: 'photos',
            to: generatePath(ROUTES.PROVIDER_PHOTOS, { id: provider.id })
          },
          {
            label: t('userAccess'),
            icon: 'userAccess',
            soon: true,
            to: generatePath(ROUTES.PROVIDER_USER_ACCESS, { id: provider.id })
          },
          {
            label: t('settings'),
            icon: 'settings',
            soon: true,
            to: generatePath(ROUTES.PROVIDER_SETTINGS, { id: provider.id })
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
            to: generatePath(ROUTES.PROVIDER_REFERRALS, { id: provider.id })
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
        ] as SidebarNavItem[])
      : [];
  }, [t, provider]);

  if (!providerId) {
    return null;
  }

  return providerLoading !== 'finished' ? (
    <Spinner size='md' fullwidth />
  ) : (
    <Container className={className}>
      <ProviderInfo
        className='provider-info'
        name={provider?.name || null}
        avatarUrl={profileAvatarUrl}
      />

      <SidebarNavigation items={navItems} />
    </Container>
  );
};

export default React.memo(ProviderSidebar);
