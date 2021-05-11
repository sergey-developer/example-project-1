import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import { ROUTES } from 'shared/constants';
import {
  loadProviderPhotosRequest,
  providerEditPhotoGallerySelector
} from 'state/ducks/providerPhotos';
import { useAppDispatch } from 'state/store';

import DashboardPage from './DashboardPage';

interface DashboardPageContainerProps {}

const DashboardPageContainer: React.FC<DashboardPageContainerProps> = ({}) => {
  const math = useRouteMatch<{ id?: string }>(ROUTES.PROVIDER_DASHBOARD);
  const providerId = math?.params?.id;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (providerId) {
      dispatch(
        loadProviderPhotosRequest({
          providerId
        })
      );
    }
  }, [providerId]);

  const providerGallery = useSelector(providerEditPhotoGallerySelector) || [];

  return <DashboardPage gallery={providerGallery} providerId={providerId} />;
};

export default DashboardPageContainer;
