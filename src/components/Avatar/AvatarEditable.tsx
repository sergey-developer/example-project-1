import React, { useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Button } from 'components/Buttons';
import { CropImageModal } from 'components/CropImageModal';
import { BasketIcon, LoadIcon } from 'components/Icons';
import { Nullable } from 'shared/types';

import { Spinner } from '../Spinner';
import {
  EditBtnWrapper,
  EmptyImage,
  FileInput,
  HintText,
  Info,
  InnerContainer,
  LabelFileInputStyled,
  OuterContainer
} from './AvatarEditable.styled';

interface AvatarEditableProps {
  className?: string;
  size?: keyof typeof sizes;
  name?: string;
  hintText?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onImageChange?: (file: Blob) => void;
  onDelete?: () => void;
  avatarUrl?: Nullable<string>;
  isLoading?: boolean;
}

const sizes = {
  small: {
    width: 14,
    height: 14
  },
  normal: {
    width: 18,
    height: 18
  }
} as const;

const AvatarEditable: React.FC<AvatarEditableProps> = ({
  className,
  size = 'normal',
  hintText,
  name,
  avatarUrl,
  onDelete = () => {},
  onChange = () => {},
  onImageChange = () => {},
  isLoading
}) => {
  useTranslation('common');
  const [image, setImage] = useState<string | ArrayBuffer>('');
  const cancelCropDialog = () => setImage('');
  const isImageLoaded = !!avatarUrl;
  const theSize = sizes[size];

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpenUploadDialog = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  const handleLoadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = e => {
      const result = e?.target?.result;

      if (result) {
        setImage(result);
      }
    };

    event?.target?.files?.length && reader.readAsDataURL(event?.target?.files[0]);
  };

  return (
    <OuterContainer
      className={className}
      $width={theSize.width}
      $height={theSize.height}
    >
      {!!image && (
        <CropImageModal
          open={!!image}
          image={image as string}
          onCrop={onImageChange}
          onClose={cancelCropDialog}
        />
      )}
      {isLoading ? (
        <Spinner size='md' fullwidth />
      ) : (
        <InnerContainer
          $width={theSize.width}
          $height={theSize.height}
          imageUrl={avatarUrl}
        >
          {isLoading ? (
            <Spinner size='md' />
          ) : (
            <>
              <FileInput ref={fileInputRef} onChange={handleLoadImage} />

              {isImageLoaded ? (
                <EditBtnWrapper className='btn-wrapper'>
                  <Button
                    variant='round'
                    className='load-icon'
                    icon={<LoadIcon />}
                    onClick={handleOpenUploadDialog}
                  />
                  <Button
                    variant='round'
                    onClick={onDelete}
                    icon={<BasketIcon size='small' />}
                  />
                </EditBtnWrapper>
              ) : (
                <>
                  <EmptyImage />
                  <HintText>
                    <Trans
                      i18nKey='common:imageAvatar.avatarHint'
                      components={[
                        <br />,
                        <LabelFileInputStyled
                          name={name}
                          onChange={handleLoadImage}
                        />
                      ]}
                    />
                    {hintText && <Info hintNode={hintText} />}
                  </HintText>
                </>
              )}
            </>
          )}
        </InnerContainer>
      )}
    </OuterContainer>
  );
};

export default AvatarEditable;
