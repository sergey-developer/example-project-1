import styled, { css } from 'styled-components/macro';

import { Typography } from 'components/Typography';

import ModalWrapper from './ModalWrapper';

export const Container = styled(ModalWrapper)``;

export const Title = styled(Typography).attrs({
  variant: 'h2Two'
})`
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const SubTitle = styled(Typography).attrs({
  variant: 'label',
  color: 'grayChateau'
})`
  text-align: center;
  margin-bottom: 2.4rem;
`;

export const ActionWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
