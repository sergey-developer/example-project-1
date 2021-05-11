import React, { useRef } from 'react';

import { Button } from 'components/Buttons';
import { BasketIcon, LoadIcon } from 'components/Icons';
import { Nullable } from 'shared/types';

import { Container, EditBtnW, EmptyIcon, LoadImage } from './ImageDropDown.styled';

const sizes = {
  small: {
    width: 5,
    height: 5
  },
  normal: {
    width: 13,
    height: 13
  }
};

export type ImageSize = keyof typeof sizes;

interface ImageDropDownProps {
  size?: ImageSize;
  className?: string;
  imageUrl?: Nullable<string>;
  onChange?: (file: File) => void;
  onDelete?: () => void;
}

const ImageDropDown: React.FC<ImageDropDownProps> = ({
  size = 'small',
  className,
  imageUrl,
  onChange = () => {},
  onDelete = () => {}
}) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const isFullMode = size !== 'small';
  const isImageLoad = !!imageUrl;
  const handleLoadImage = () => {
    isFullMode && imageInputRef?.current && imageInputRef?.current?.click();
  };

  return (
    <Container
      className={className}
      onClick={() => !isImageLoad && handleLoadImage()}
      $imageSrc={imageUrl}
      {...sizes[size]}
    >
      <LoadImage
        onChange={e =>
          e?.target?.files && e?.target?.files[0] && onChange(e?.target?.files[0])
        }
        ref={imageInputRef}
      />
      {isImageLoad && isFullMode && (
        <EditBtnW className='btn-wrapper'>
          <Button variant='round' onClick={handleLoadImage} icon={<LoadIcon />} />
          <Button
            variant='round'
            className='delete-btn'
            onClick={onDelete}
            icon={<BasketIcon size='small' />}
          />
        </EditBtnW>
      )}

      {!isImageLoad && <EmptyIcon size={size} />}
    </Container>
  );
};

export default ImageDropDown;
