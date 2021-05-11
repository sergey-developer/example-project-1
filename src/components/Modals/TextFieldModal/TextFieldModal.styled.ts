import styled, { css } from 'styled-components/macro';

import { TextAreaInput } from '../../Inputs';
import { TextArea as BaseTextArea } from '../../Inputs/TextAreaInput.styled';

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  & > :not(:last-child) {
    margin-bottom: 1.2rem;
  }
`;

export const TextArea = styled(TextAreaInput).attrs({
  height: 11.4
})<{ hasError?: boolean }>`
  ${({ theme, hasError }) => css`
    ${BaseTextArea} {
      display: flex;
      width: 100%;

      padding: 1.5rem;

      border: 1px solid ${theme.colors.grayChateau};
      border-radius: ${theme.common.inputBorderRadius};

      outline: none;
      box-shadow: unset;
      color: unset;

      &:focus,
      &:active {
        border: 1px solid ${theme.colors.lightGreen};
      }

      &::placeholder {
        color: ${theme.colors.grayChateau};
      }

      ${css(theme.fonts.subTitleTwo)}

      ${hasError &&
      css`
        &,
        &:focus,
        &:active {
          border-color: ${theme.colors.warn};
        }
      `}
    }
  `}
`;
