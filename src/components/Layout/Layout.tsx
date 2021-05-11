import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useRouteMatch } from 'react-router-dom';
import useToggle from 'react-use/lib/useToggle';

import { NO_SIDEBAR_ROUTES, ROUTES } from 'shared/constants';
import { providerSelector } from 'state/ducks/provider';
import {
  providerEditProfileStateSelector,
  publicProviderErrorSelector,
  publishProviderDiscardRequest,
  publishProviderRequest
} from 'state/ducks/providerEditProfile';
import { useAppDispatch } from 'state/store';

import {
  Container,
  ContentWrapper,
  HeaderStyled,
  PublishProviderBox,
  SidebarStyled
} from './Layout.styled';

export const Layout: React.FC = ({ children }) => {
  const [sidebarOpened, setSidebarOpened] = useToggle(false);
  const [sidebar, setSidebar] = useToggle(true);
  let location = useLocation();
  const dispatch = useAppDispatch();
  const math = useRouteMatch<{ id?: string }>(ROUTES.PROVIDER_ROOT);
  const providerState = useSelector(providerSelector);
  const providerEditState = useSelector(providerEditProfileStateSelector);
  const publicProviderErrors = useSelector(publicProviderErrorSelector);
  const provideEditStatus = providerEditState?.data?.providerStatus;
  const providerId = math?.params?.id;
  const provider = providerState?.data;
  const profileId = provider?.activeProfileId;

  const handlePublishUpdate = async () => {
    if (profileId && providerId) {
      dispatch(
        publishProviderRequest({
          profileId,
          providerId
        })
      );
    }
  };

  const handleRejectUpdate = async () => {
    if (profileId && providerId) {
      dispatch(
        publishProviderDiscardRequest({
          profileId,
          providerId
        })
      );
    }
  };

  useEffect(() => {
    if (NO_SIDEBAR_ROUTES.includes(location.pathname)) {
      setSidebar(true);
    } else {
      setSidebar(false);
    }
  }, [location]);

  const openSidebar = () => setSidebarOpened(true);
  const closeSidebar = () => setSidebarOpened(false);

  return (
    <Container noSidebar={sidebar}>
      <HeaderStyled onBurgerClick={openSidebar} />
      {providerId && (
        <PublishProviderBox
          providerId={providerId}
          publicProviderErrors={publicProviderErrors}
          status={provideEditStatus}
          onPublishUpdate={handlePublishUpdate}
          onRejectUpdate={handleRejectUpdate}
        />
      )}
      {!sidebar && <SidebarStyled $open={sidebarOpened} onClose={closeSidebar} />}

      <ContentWrapper>{children}</ContentWrapper>
    </Container>
  );
};
