import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from 'components/Buttons';
import { DropZone } from 'components/DropZone';
import { ModalWrapper } from 'components/Modals';
import { Nullable } from 'shared/types';

import { ActionWrapper, Title } from './UploadNewPhotosModal.styled';

interface UploadNewPhotosModalProps {
  open?: boolean;
  onClose?: () => void;
  onChange?: (files: File[]) => void;
  uploadProgress?: Nullable<number>;
}

const UploadNewPhotosModal: React.FC<UploadNewPhotosModalProps> = ({
  open,
  onClose = () => {},
  onChange = () => {},
  uploadProgress
}) => {
  const [translation] = useTranslation('modals');
  const t = (key: string) => translation(`photoUploadModal.${key}`);

  return (
    <ModalWrapper open={!!open} onClose={onClose}>
      <Title>{t('title')}</Title>
      <DropZone
        variant='photo_modal'
        onDropFile={onChange}
        uploadProgress={uploadProgress}
      />

      <ActionWrapper>
        <Button variant='additional' onClick={onClose}>
          {t('cancelBtnLabel')}
        </Button>
      </ActionWrapper>
    </ModalWrapper>
  );
};

export default UploadNewPhotosModal;
