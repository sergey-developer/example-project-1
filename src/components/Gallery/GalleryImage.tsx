import React from 'react';

import { Button } from 'components/Buttons';
import { BasketIcon } from 'components/Icons';

import { ActionBtnWrapper, Container, Image } from './GalleryImage.styled';

interface GalleryImageProps {
  index?: number;
  photoUrl?: string | null;
  alt?: string | null;
  className?: string;
  onDelete: (index: number) => void;
  noDelete?: boolean;
}

const GalleryImage: React.FC<GalleryImageProps> = ({
  photoUrl,
  onDelete = () => {},
  index,
  alt = '',
  noDelete
}) => {
  return (
    <Container>
      <Image src={photoUrl || ''} alt={alt || ''} />
      <ActionBtnWrapper className='btn-wrapper'>
        {!noDelete && (
          <Button
            variant='round'
            onClick={() => index !== undefined && onDelete(index)}
            icon={<BasketIcon size='small' />}
          />
        )}
      </ActionBtnWrapper>
    </Container>
  );
};

export default GalleryImage;
