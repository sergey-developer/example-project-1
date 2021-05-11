import React, { createContext, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import useToggle from 'react-use/lib/useToggle';

import { Button } from 'components/Buttons';
import BaseAcceptModal from 'components/Modals/BaseAcceptModal';

const defaultInModerationModalContext = {
  openOnModerationModal: () => {}
};

type InModerationModalContextType = typeof defaultInModerationModalContext;

export const InModerationModalContext = createContext<InModerationModalContextType>(
  defaultInModerationModalContext
);

export const useInModerationModal = () =>
  useContext<InModerationModalContextType>(InModerationModalContext);

interface InModerationModalProps {}

export const InModerationModalProvider: React.FC<InModerationModalProps> = ({
  children
}) => {
  const [t] = useTranslation('modals');
  const [open, setOpen] = useToggle(false);
  const openOnModerationModal = () => setOpen(true);
  const closeOnModerationModal = () => setOpen(false);
  return (
    <InModerationModalContext.Provider value={{ openOnModerationModal }}>
      {open && (
        <BaseAcceptModal
          maxWidth={60}
          open={open}
          onClose={closeOnModerationModal}
          title={t('inModeration.title')}
          action={
            <Button variant='primary' onClick={closeOnModerationModal}>
              {t('inModeration.okBtnLabel')}
            </Button>
          }
        />
      )}
      {children}
    </InModerationModalContext.Provider>
  );
};
