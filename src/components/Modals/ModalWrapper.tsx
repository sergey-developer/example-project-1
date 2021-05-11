import '@reach/dialog/styles.css';

import { nanoid } from '@reduxjs/toolkit';
import React from 'react';

import { ColorType } from 'styles/theme';

import { CloseBtn, Content, Overlay } from './ModalWrapper.styled';

export type ModalWrapperProps = {
  onClose?: () => void;
  open?: boolean;
  maxWidth?: number;
  backgroundColor?: ColorType;
  className?: string;
  ariaLabel?: string;
  ariaLabelledby?: string;
};

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  onClose = () => {},
  open,
  maxWidth,
  children,
  backgroundColor = 'white',
  className,
  ariaLabel,
  ariaLabelledby
}) => {
  return (
    <Overlay
      isOpen={open}
      onDismiss={onClose}
      className={className}
      aria-labelledby={ariaLabelledby || nanoid()}
    >
      <Content
        $maxWidth={maxWidth}
        $backgroundColor={backgroundColor}
        aria-label={ariaLabel || 'Modal content'}
      >
        <CloseBtn size='small' onClick={onClose} />
        {children}
      </Content>
    </Overlay>
  );
};

export default ModalWrapper;
