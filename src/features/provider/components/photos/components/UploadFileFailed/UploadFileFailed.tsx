import React from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as ImageIcon } from 'assets/icons/ImageIcon.svg';
import { ReactComponent as WarnIcon } from 'assets/icons/WarnIcon.svg';
import { Button } from 'components/Buttons';
import { ModalWrapper } from 'components/Modals';
import { FileError } from 'state/ducks/providerPhotos';

import {
  ActionWrapper,
  ErrorItem,
  ErrorList,
  ErrorText,
  FileName,
  Title
} from './UploadFileFailed.styled';

interface UploadFileFailedProps {
  open?: boolean;
  onClose?: () => void;
  uploadPhotoErrors: FileError[];
  onAddAnotherPhoto: () => void;
}

const UploadFileFailed: React.FC<UploadFileFailedProps> = ({
  open,
  onClose = () => {},
  onAddAnotherPhoto = () => {},
  uploadPhotoErrors
}) => {
  const [translation] = useTranslation('modals');
  const t = (key: string) => translation(`uploadFileFailedModal.${key}`);

  return (
    <ModalWrapper open={open} onClose={onClose} maxWidth={70}>
      <Title leftIcon={<WarnIcon />}>{t('title')}</Title>

      <ErrorList>
        {uploadPhotoErrors.map((error, index) => (
          <ErrorItem key={index}>
            <FileName leftIcon={<ImageIcon />}>{error.fileName}</FileName>
            <ErrorText>{t(`errors.${error.errorType}`)}</ErrorText>
          </ErrorItem>
        ))}
      </ErrorList>

      <ActionWrapper>
        <Button variant='primary' spaceRight={1.2} onClick={onAddAnotherPhoto}>
          {t('addPhotoLabel')}
        </Button>
        <Button variant='additional' onClick={onClose}>
          {t('cancelLabel')}
        </Button>
      </ActionWrapper>
    </ModalWrapper>
  );
};

export default UploadFileFailed;
