import React from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components/macro';

import { Button } from 'components/Buttons';
import BaseAcceptModal from 'components/Modals/BaseAcceptModal';

const AcceptButton = styled(Button).attrs({
  variant: 'primary'
})`
  margin-right: 1.2rem;
`;

const CancelButton = styled(Button).attrs({
  variant: 'additional'
})``;

interface SetMainLocationProps {
  className?: string;
  open?: boolean;
  onClose?: () => void;
  onAccept?: () => void;
}

const SetMainLocation: React.FC<SetMainLocationProps> = ({
  className,
  open,
  onClose = () => {},
  onAccept = () => {}
}) => {
  const [translation] = useTranslation('modals');
  const t = (key: string) => translation(`setMainLocation.${key}`);
  return (
    <BaseAcceptModal
      title={t('title')}
      subTitle={t('subTitle')}
      className={className}
      open={open}
      onClose={onClose}
      action={
        <>
          <AcceptButton onClick={onAccept}>{t('acceptBthLabel')}</AcceptButton>
          <CancelButton onClick={onClose}>{t('cancelBtnLabel')}</CancelButton>
        </>
      }
    />
  );
};

export default SetMainLocation;
