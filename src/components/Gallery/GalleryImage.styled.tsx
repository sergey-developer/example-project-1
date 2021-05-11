import styled, { css } from 'styled-components/macro';

export const Container = styled.div`
  width: 100%;
  padding-bottom: 100%;
  position: relative;
  ${({ theme }) => css`
    border-radius: ${theme.common.defaultBorderRadius};
  `}
  & > .btn-wrapper {
    visibility: hidden;
    transition: all 0.3s;
    opacity: 0;
  }
  &:hover {
    filter: brightness(80%);
    & > .btn-wrapper {
      visibility: visible;
      opacity: 1;
    }
  }
`;

export const Image = styled.img`
  position: absolute;
  width: inherit;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: cover;
  ${({ theme }) => css`
    border-radius: ${theme.common.defaultBorderRadius};
  `}
`;

export const ActionBtnWrapper = styled.div`
  z-index: 3;
  position: absolute;
  width: inherit;
  top: 0;
  display: flex;
  padding: 0.4rem;
  justify-content: flex-end;
`;
