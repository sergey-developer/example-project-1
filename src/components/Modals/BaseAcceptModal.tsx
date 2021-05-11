import React from 'react';

import { ActionWrapper, Container, SubTitle, Title } from './BaseAcceptModal.styled';

interface BaseAcceptModalProps {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  subTitle?: string | React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  maxWidth?: number;
}

const BaseAcceptModal: React.FC<BaseAcceptModalProps> = ({
  open,
  onClose = () => {},
  title,
  subTitle,
  action,
  className,
  maxWidth = 70
}) => {
  return (
    <Container
      open={open}
      onClose={onClose}
      className={className}
      maxWidth={maxWidth}
    >
      {title && <Title>{title}</Title>}
      {subTitle && <SubTitle>{subTitle}</SubTitle>}
      {action && <ActionWrapper>{action}</ActionWrapper>}
    </Container>
  );
};

export default BaseAcceptModal;
