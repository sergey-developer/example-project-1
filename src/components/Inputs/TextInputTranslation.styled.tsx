import styled, { css } from 'styled-components/macro';

import { ArrowIcon } from 'components/Icons';

import { TextInput } from './TextInput';

export const Wrapper = styled.div``;

export const Input = styled(TextInput)`
  margin-right: 1rem;
  max-width: 30rem;
`;

export const ValueShow = styled.div`
  margin-right: 1rem;
`;

export const LangSelectW = styled.div``;

export const ShowTranslation = styled.div`
  ${({ theme }) => css`
    margin-left: auto;
    color: ${theme.colors.warn};
    cursor: pointer;
    white-space: nowrap;
  `}
`;

export const OpenClose = styled(ArrowIcon)<{ $open?: boolean }>`
  cursor: pointer;
  transition: all 0.3s;
  margin-left: 0.5rem;
  margin-top: 0.3rem;
  ${({ $open }) =>
    $open &&
    css`
      transform: rotate(180deg);
    `}
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  padding: 0.2rem;
`;

export const AdditionalInputs = styled.div<{ $open?: boolean }>`
  ${({ theme, $open }) => css`
    max-height: 0;
    transition: max-height 0.3s ease-out;
    overflow: hidden;
    ${$open &&
    css`
      max-height: 100vh;
      transition: max-height 0.3s ease-in;
    `}
  `}
`;
