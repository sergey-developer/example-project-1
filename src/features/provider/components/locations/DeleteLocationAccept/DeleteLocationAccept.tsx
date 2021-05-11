import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from 'components/Buttons';
import BaseAcceptModal from 'components/Modals/BaseAcceptModal';

interface DeleteLocationAcceptProps {
  className?: string;
  open?: boolean;
  onClose?: () => void;
  onAccept?: () => void;
}

const DeleteLocationAccept: React.FC<DeleteLocationAcceptProps> = ({
  className,
  open,
  onClose,
  onAccept
}) => {
  const [translation] = useTranslation('modals');
  const t = (key: string) => translation(`deleteLocationAccept.${key}`);

  return (
    <BaseAcceptModal
      title={t('title')}
      subTitle={t('subTitle')}
      className={className}
      open={open}
      onClose={onClose}
      action={
        <>
          <Button onClick={onAccept} spaceRight={1.2} variant='warn'>
            {t('deleteBtnLabel')}
          </Button>
          <Button onClick={onClose} variant='additional'>
            {t('cancelBtnLabel')}
          </Button>
        </>
      }
    />
  );
};

export default DeleteLocationAccept;
