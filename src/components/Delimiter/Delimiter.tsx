import styled, { css } from 'styled-components/macro';

export const Delimiter = styled.div<{
  marginBottom?: number;
  marginTop?: number;
}>`
  ${({ theme, marginBottom, marginTop }) => css`
    width: 100%;
    border-bottom: 0.1rem solid ${theme.colors.iron};
    ${marginBottom && `margin-bottom: ${marginBottom}rem;`}
    ${marginTop && `margin-bottom: ${marginTop}rem;`}
  `}
`;
