import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Trans, useTranslation } from 'react-i18next';

import { InfoHint } from 'components/Hints';
import { EmptyImageIcon } from 'components/Icons';
import { Typography } from 'components/Typography';
import { Nullable } from 'shared/types';

import {
  Container,
  FileInput,
  FileLabel,
  LabelFileInputStyled,
  UploadingLabel,
  UploadingProgress,
  UploadingWrapper
} from './DropZone.styled';

export type DropZoneVariant = 'photo_page' | 'photo_modal';

interface DropZoneProps {
  variant: DropZoneVariant;
  className?: string;
  uploadProgress?: Nullable<number>;
  onDropFile?: (files: File[]) => void;
}

const DropZone: React.FC<DropZoneProps> = ({
  variant,
  className,
  uploadProgress,
  onDropFile = () => {}
}) => {
  const [t] = useTranslation('common');
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onDropFile(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop
  });

  return (
    <Container variant={variant} {...getRootProps({ className })}>
      <FileInput {...getInputProps()} />
      {uploadProgress ? (
        <UploadingWrapper>
          <UploadingLabel>{t('uploadingProgressLabel')}</UploadingLabel>
          <UploadingProgress progress={uploadProgress} />
        </UploadingWrapper>
      ) : (
        <>
          <EmptyImageIcon />
          <Typography tag='span' className='text' variant='subTitle'>
            <Trans i18nKey='common:dropImageHint' components={[<FileLabel />]} />
          </Typography>
          <InfoHint hintNode={'Hint text'} />
        </>
      )}
    </Container>
  );
};

export default DropZone;
