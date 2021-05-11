import styled, { css } from 'styled-components/macro';

export const Container = styled.div<{ maxWidth?: number }>`
  ${({ maxWidth }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    ${maxWidth
      ? css`
          max-width: ${maxWidth}rem;
        `
      : ''}
  `}
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;
