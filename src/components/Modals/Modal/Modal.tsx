import React from 'react';

import { Typography } from '../../Typography';
import { ModalWrapperProps } from '../ModalWrapper';
import { Actions, Modal as BaseModal, ModalBody, ModalHeader } from './Modal.styled';

export type ModalProps = ModalWrapperProps & {
  title: string;
  children: React.ReactElement;
  actions?: React.ReactElement[];
};

const Modal: React.FC<ModalProps> = ({ title, actions, children, ...props }) => {
  return (
    <BaseModal {...props}>
      <ModalHeader>
        <Typography variant='h3Two'>{title}</Typography>
      </ModalHeader>

      <ModalBody>
        {children}

        {!!actions?.length && (
          <Actions>{React.Children.map(actions, action => action)}</Actions>
        )}
      </ModalBody>
    </BaseModal>
  );
};

export default Modal;
