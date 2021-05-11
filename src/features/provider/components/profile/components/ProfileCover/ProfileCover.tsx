import React, { useRef, useState } from 'react';
import { Trans } from 'react-i18next';

import { Button } from 'components/Buttons';
import { CropImageModal } from 'components/CropImageModal';
import { CropType } from 'components/CropImageModal/CropImageModal';
import { BasketIcon, LoadIcon } from 'components/Icons';
import { Nullable } from 'shared/types';

import {
  Avatar,
  Container,
  CoverHint,
  EditBtnWrapper,
  EmptyImage,
  FileInput,
  Info,
  OpenFileDialog,
  SpinnerCover
} from './ProfileCover.styled';

interface ProfileCoverProps {
  className?: string;
  avatarFieldName?: string;
  avatarUrl?: Nullable<string>;
  onAvatarChange?: (file: Blob) => void;
  onCoverChange?: (file: Blob) => void;
  onAvatarDelete?: () => void;
  onCoverDelete?: () => void;
  isSelfEmployed?: boolean;
  avatarLoading?: boolean;
  coverIsLoading?: boolean;
  coverImageUrl?: Nullable<string>;
}

export const ProfileCover: React.FC<ProfileCoverProps> = ({
  className,
  avatarFieldName,
  onAvatarChange = () => {},
  onAvatarDelete = () => {},
  onCoverChange = () => {},
  onCoverDelete = () => {},
  avatarUrl,
  isSelfEmployed,
  avatarLoading,
  coverIsLoading,
  coverImageUrl
}) => {
  const [coverFile, setCoverFile] = useState<string | ArrayBuffer>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cancelCropDialog = () => setCoverFile('');
  const handleLoadCover = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = e => {
      const result = e?.target?.result;

      if (result) {
        setCoverFile(result);
      }
    };

    event?.target?.files?.length && reader.readAsDataURL(event?.target?.files[0]);
  };
  const handleOpenUploadDialog = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  return (
    <Container
      className={className}
      isSelfEmployed={isSelfEmployed}
      imageUrl={coverImageUrl}
    >
      <FileInput ref={fileInputRef} onChange={handleLoadCover} />
      {coverFile && (
        <CropImageModal
          open={!!coverFile}
          cropType={CropType.ProfileCover}
          image={coverFile as string}
          onClose={cancelCropDialog}
          onCrop={onCoverChange}
        />
      )}
      <Avatar
        name={avatarFieldName}
        onImageChange={onAvatarChange}
        onDelete={onAvatarDelete}
        avatarUrl={avatarUrl}
        isLoading={avatarLoading}
        className='avatar'
        hintText={
          <Trans i18nKey='common:imageCover.infoHint' components={[<br />]} />
        }
      />

      {!isSelfEmployed && !coverImageUrl ? (
        <>
          {!coverIsLoading ? (
            <>
              <EmptyImage />
              <CoverHint>
                <Trans
                  i18nKey='common:imageCover.coverHint'
                  components={[<OpenFileDialog onChange={handleLoadCover} />]}
                />
                <Info
                  hintNode={
                    <Trans
                      i18nKey='common:imageCover.coverInfoHint'
                      components={[<br />]}
                    />
                  }
                />
              </CoverHint>
            </>
          ) : (
            <SpinnerCover />
          )}
        </>
      ) : (
        <EditBtnWrapper className='btn-wrapper'>
          <Button
            variant='round'
            className='load-btn'
            icon={<LoadIcon />}
            onClick={handleOpenUploadDialog}
          />
          <Button
            variant='round'
            onClick={onCoverDelete}
            icon={<BasketIcon size='small' />}
          />
        </EditBtnWrapper>
      )}
    </Container>
  );
};
