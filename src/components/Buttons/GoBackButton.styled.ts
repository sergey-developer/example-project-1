import styled, { css } from 'styled-components/macro';

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const Button = styled.button`
  ${({ theme }) => css`
    ${css(theme.fonts.h5)}

    margin-left: 1rem;
    color: ${theme.colors.glacier};
    border-bottom: 1px solid ${theme.colors.glacier};
    cursor: pointer;
  `}
`;
