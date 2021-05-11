import React, { useCallback, useEffect, useState } from 'react';
import Cropper, { CropperProps } from 'react-easy-crop';
import { Area } from 'react-easy-crop/types';
import { useTranslation } from 'react-i18next';

import { ValueOf } from 'shared/types';

import getCroppedImg from './cropImage';
import {
  BtnWrapper,
  CancelBtn,
  Container,
  ControlWrapper,
  CropBtn,
  CropperWrapper,
  ZoomRange
} from './CropImageModal.styled';

export enum CropType {
  Avatar = 'Avatar',
  ProfileCover = 'ProfileCover'
}

const cropperProps: {
  [key in ValueOf<typeof CropType>]: Pick<CropperProps, 'cropShape' | 'aspect'>;
} = {
  [CropType.Avatar]: {
    cropShape: 'round',
    aspect: 1
  },
  [CropType.ProfileCover]: {
    cropShape: 'rect',
    aspect: 80 / 35
  }
};

interface CropImageModalProps {
  open?: boolean;
  onClose?: () => void;
  onCrop?: (file: Blob) => void;
  className?: string;
  image: string;
  cropType?: CropType;
}

const CropImageModal: React.FC<CropImageModalProps> = ({
  open,
  onClose = () => {},
  className,
  image,
  onCrop = () => {},
  cropType = CropType.Avatar
}) => {
  const [translation] = useTranslation('modals');
  const t = (key: string) => translation(`cropImageModal.${key}`);
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<null | Area>(null);
  const onCropComplete = useCallback((_, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropImage = async () => {
    if (croppedAreaPixels) {
      const cropImage = await getCroppedImg(image, croppedAreaPixels);
      onCrop(cropImage);
      onClose();
    }
  };

  return (
    <Container open={open} onClose={onClose} className={className}>
      <CropperWrapper>
        <Cropper
          image={image}
          zoom={zoom}
          crop={crop}
          onZoomChange={setZoom}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          {...cropperProps[cropType]}
        />
      </CropperWrapper>
      <ControlWrapper>
        <ZoomRange
          max='3'
          min='1'
          step='0.01'
          value={zoom}
          onChange={e => setZoom(+e.target.value)}
        />
        <BtnWrapper>
          <CancelBtn onClick={onClose}>{t('cancelBtnLabel')}</CancelBtn>
          <CropBtn onClick={handleCropImage}>{t('cropBtnLabel')}</CropBtn>
        </BtnWrapper>
      </ControlWrapper>
    </Container>
  );
};

export default CropImageModal;
