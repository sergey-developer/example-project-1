import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components/macro';

import { Button } from 'components/Buttons';
import BaseAcceptModal from 'components/Modals/BaseAcceptModal';

const OkButton = styled(Button).attrs({
  variant: 'primary'
})`
  margin-right: 0.7rem;
`;

const CancelButton = styled(Button).attrs({
  variant: 'additional'
})``;

interface AcceptPublishProcessModalProps {
  className?: string;
  open?: boolean;
  onClose?: () => void;
  onAccept?: () => void;
}

const AcceptPublishProcessModal: React.FC<AcceptPublishProcessModalProps> = ({
  className,
  open,
  onClose = () => {},
  onAccept = () => {}
}) => {
  const [translation] = useTranslation('modals');
  const t = (key: string) => translation(`acceptPublishProcessModal.${key}`);
  return (
    <BaseAcceptModal
      open={open}
      onClose={onClose}
      className={className}
      title={t('title')}
      maxWidth={74}
      subTitle={
        <Trans
          i18nKey='modals:acceptPublishProcessModal.subTitle'
          components={[<br />]}
        />
      }
      action={
        <>
          <OkButton onClick={onAccept}>{t('okBtnLabel')}</OkButton>
          <CancelButton onClick={onClose}>{t('cancelBthLabel')}</CancelButton>
        </>
      }
    />
  );
};

export default AcceptPublishProcessModal;
