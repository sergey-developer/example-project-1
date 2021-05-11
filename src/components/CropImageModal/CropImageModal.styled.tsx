import styled, { css } from 'styled-components/macro';

import { Button } from 'components/Buttons';
import { ModalWrapper } from 'components/Modals';

export const Container = styled(ModalWrapper).attrs({
  maxWidth: 100
})``;

export const CropperWrapper = styled.div`
  width: 100%;
  min-height: 60rem;
  position: relative;
`;

export const ControlWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-top: 1.6rem;
`;

export const ZoomRange = styled.input.attrs({
  type: 'range'
})`
  width: 40rem;
`;

export const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 7.2rem;
`;

export const CancelBtn = styled(Button).attrs({
  variant: 'additional'
})`
  margin-right: 0.8rem;
`;

export const CropBtn = styled(Button).attrs({
  variant: 'primary'
})``;
