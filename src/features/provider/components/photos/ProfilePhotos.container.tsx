import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { useProviderPhotosSlice } from 'features/provider/hooks';
import { EditProviderStatusEnum } from 'features/provider/types';
import { providerEditProfileStateSelector } from 'state/ducks/providerEditProfile';
import {
  closeUploadPhotoModal,
  closeUploadRejectModal,
  deletePhotoRequest,
  loadProviderPhotosRequest,
  openUploadPhotoModal,
  providerEditPhotoGallerySelector,
  providerEditPhotoUploadModalSelector,
  providerEditPhotoUploadProgressSelector,
  uploadPhotoErrorSelector,
  uploadPhotosRequest
} from 'state/ducks/providerPhotos';
import { useAppDispatch } from 'state/store';

import ProfilePhotos from './ProfilePhotos';

interface ProfilePhotosContainerProps extends RouteComponentProps<{ id: string }> {}

const ProfilePhotosContainer: React.FC<ProfilePhotosContainerProps> = ({
  match
}) => {
  // useProviderPhotosSlice();
  const dispatch = useAppDispatch();
  const providerId = match.params.id;
  useEffect(() => {
    if (providerId) {
      dispatch(
        loadProviderPhotosRequest({
          providerId
        })
      );
    }
  }, [providerId]);

  const gallery = useSelector(providerEditPhotoGallerySelector);
  const uploadPhotosProgress = useSelector(providerEditPhotoUploadProgressSelector);
  const uploadModalOpen = useSelector(providerEditPhotoUploadModalSelector);

  const profile = useSelector(providerEditProfileStateSelector);
  const uploadPhotoErrors = useSelector(uploadPhotoErrorSelector);

  const isProfileWatPublish =
    profile?.data?.providerStatus === EditProviderStatusEnum.UpdateInProgress;

  const handlePhotosUpload = (files: File[]) => {
    if (files) {
      dispatch(uploadPhotosRequest({ files: Array.from(files) }));
    }
  };
  const handleDeletePhoto = (index?: number) => {
    if (index !== undefined) {
      dispatch(
        deletePhotoRequest({
          index
        })
      );
    }
  };

  const handleOpenUploadModal = () => {
    dispatch(openUploadPhotoModal());
  };

  const handleCloseUploadModal = () => {
    dispatch(closeUploadPhotoModal());
  };

  const handleCloseFailedModal = () => {
    dispatch(closeUploadRejectModal());
  };

  return (
    <ProfilePhotos
      onPhotosUpload={handlePhotosUpload}
      onPhotoDelete={handleDeletePhoto}
      profileWatPublish={isProfileWatPublish}
      uploadPhotoErrors={uploadPhotoErrors}
      onOpenUploadModal={handleOpenUploadModal}
      onCloseUploadModal={handleCloseUploadModal}
      onCloseFailedModal={handleCloseFailedModal}
      uploadModalState={uploadModalOpen}
      uploadProgress={uploadPhotosProgress}
      gallery={gallery}
    />
  );
};

export default ProfilePhotosContainer;
