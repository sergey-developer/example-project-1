import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { generatePath, useHistory, useRouteMatch } from 'react-router-dom';

import { HeaderDropdownNav, NavItemType } from 'components/Nav';
import { Typography } from 'components/Typography';
import { ROUTES } from 'shared/constants/routes';
import { providerListSelector } from 'state/ducks/providerList';

import { Button } from '../../Buttons';
import { Spinner } from '../../Spinner';
import {
  Container,
  NavigationItem,
  NavigationLink,
  NavigationList
} from './HeaderNavigation.styled';

interface HeaderNavigationProps {
  className?: string;
  mobileMod?: boolean;
}

export const HeaderNavigation: React.FC<HeaderNavigationProps> = ({
  className,
  mobileMod
}) => {
  const [t] = useTranslation('navigation');
  let history = useHistory();
  const isProviderRoute = useRouteMatch(ROUTES.PROVIDER_ROOT);
  const { data: providerList, loading: providerListLoading } = useSelector(
    providerListSelector
  );

  const dropdownItems =
    (providerList?.map(provider => ({
      label: provider.name,
      to: generatePath(ROUTES.PROVIDER_DASHBOARD, { id: provider.id })
    })) as NavItemType[]) || [];

  const providerListLoaded = providerListLoading === 'finished';

  const handleGotToBecomePage = () => {
    history.push(ROUTES.PROVIDER_BECOME);
  };

  return (
    <Container className={className}>
      <NavigationList>
        <NavigationItem>
          <NavigationLink to={ROUTES.USER_ROOT} $mod={mobileMod}>
            <Typography color='glacier' variant='body' tag='span'>
              {t('myProfile')}
            </Typography>
          </NavigationLink>
        </NavigationItem>

        {providerListLoading === 'pending' ? (
          <Spinner size='sm' />
        ) : providerListLoaded && !!dropdownItems.length ? (
          <HeaderDropdownNav items={dropdownItems} isActive={!!isProviderRoute}>
            {t('providers')}
          </HeaderDropdownNav>
        ) : null}
      </NavigationList>

      {providerListLoaded && !dropdownItems.length ? (
        <Button onClick={handleGotToBecomePage}>{t('becomeProviderLabel')}</Button>
      ) : null}
    </Container>
  );
};
