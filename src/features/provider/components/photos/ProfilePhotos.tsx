import 'intersection-observer';

import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useIsVisible } from 'react-is-visible';

import { Button } from 'components/Buttons';
import { DropZone } from 'components/DropZone';
import { PlusIcon } from 'components/Icons';
import { ProfileGalleryModel } from 'features/provider/types/models/EditProviderProfile';
import { Nullable } from 'shared/types';
import { FileError } from 'state/ducks/providerPhotos';

import UploadFileFailed from './components/UploadFileFailed';
import UploadNewPhotosModal from './components/UploadNewPhotosModal/UploadNewPhotosModal';
import {
  GalleryItem,
  GalleryWrapper,
  PageContainer,
  PlusBtn
} from './ProfilePhotos.styled';

interface ProfilePhotosProps {
  onPhotosUpload: (files: File[]) => void;
  onPhotoDelete: (index?: number) => void;
  onOpenUploadModal: () => void;
  onCloseUploadModal: () => void;
  onCloseFailedModal: () => void;
  uploadModalState: boolean;
  gallery: ProfileGalleryModel[];
  uploadPhotoErrors: FileError[];
  profileWatPublish: boolean;
  uploadProgress: Nullable<number>;
}

const ProfilePhotos: React.FC<ProfilePhotosProps> = ({
  onPhotosUpload = () => {},
  onPhotoDelete = () => {},
  profileWatPublish,
  gallery,
  onCloseUploadModal = () => {},
  onOpenUploadModal = () => {},
  onCloseFailedModal = () => {},
  uploadModalState,
  uploadPhotoErrors,
  uploadProgress
}) => {
  const [translation] = useTranslation('provider-pages');
  const addPhotoBtnRef = useRef(null);

  const handlePhotoDelete = (index?: number) => () => {
    onPhotoDelete(index);
  };

  const isUploadBtnVisible: boolean = useIsVisible(addPhotoBtnRef);

  const t = (key: string) => translation(`providerPhotos.${key}`);
  return (
    <PageContainer
      title={t('title')}
      button={
        <Button
          displayNode={profileWatPublish}
          variant='secondary'
          icon={<PlusIcon color='white' />}
          onClick={onOpenUploadModal}
          ref={addPhotoBtnRef}
        >
          {t('uploadBtnLabel')}
        </Button>
      }
    >
      {!isUploadBtnVisible && !profileWatPublish && (
        <PlusBtn icon={<PlusIcon color='white' />} onClick={onOpenUploadModal} />
      )}
      {uploadModalState && (
        <UploadNewPhotosModal
          uploadProgress={uploadProgress}
          open={uploadModalState}
          onClose={onCloseUploadModal}
          onChange={onPhotosUpload}
        />
      )}

      {!uploadModalState && (
        <UploadFileFailed
          uploadPhotoErrors={uploadPhotoErrors}
          open={!!uploadPhotoErrors.length}
          onClose={onCloseFailedModal}
          onAddAnotherPhoto={onOpenUploadModal}
        />
      )}
      {gallery && !!gallery.length ? (
        <GalleryWrapper>
          {gallery.map((item, index) => (
            <GalleryItem
              key={index}
              noDelete={profileWatPublish}
              onDelete={handlePhotoDelete(item?.index)}
              {...item}
            />
          ))}
        </GalleryWrapper>
      ) : (
        !profileWatPublish && (
          <DropZone
            variant='photo_page'
            onDropFile={onPhotosUpload}
            uploadProgress={uploadProgress}
          />
        )
      )}
    </PageContainer>
  );
};

export default ProfilePhotos;
