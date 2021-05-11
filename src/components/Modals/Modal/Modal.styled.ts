import styled from 'styled-components/macro';

import ModalWrapper from '../ModalWrapper';
import { CloseBtn, Content } from '../ModalWrapper.styled';

export const Modal = styled(ModalWrapper)`
  ${CloseBtn} {
    top: 2.3rem;
    right: 3rem;
  }

  ${Content} {
    &[data-reach-dialog-content] {
      padding: 0;
    }
  }
`;

export const ModalHeader = styled.header`
  padding: 1.8rem 2.5rem;

  border-top-left-radius: inherit;
  border-top-right-radius: inherit;

  background-color: ${({ theme }) => theme.colors.wildSand};
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;

  padding: 2.5rem;

  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
`;

export const Actions = styled.div`
  min-width: 8rem;

  display: flex;
  align-self: flex-end;

  margin-top: 1.5rem;

  & > :not(:last-child) {
    margin-right: 1.5rem;
  }
`;
