import styled, { css } from 'styled-components/macro';

import { Button } from 'components/Buttons';

export const Container = styled.div`
  ${({ theme }) => css`
    & .page-paginate {
      list-style: none;
      display: flex;
      & li {
        margin-right: 0.5rem;
        &:last-child {
          margin-right: none;
        }
      }
    }

    & li.pages > a,
    & li.break > a {
      width: 5rem;
      height: 100%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 0.2rem solid ${theme.colors.grayTwelve};
      border-radius: 0.5rem;
      color: ${theme.colors.glacier};
      ${css(theme.fonts.body)}
      cursor: pointer;
    }
    & li.pages.active > a {
      background-color: ${theme.colors.glacier};
      color: ${theme.colors.white};
    }
  `}
`;

export const PageChangeBtn = styled(Button).attrs({
  variant: 'additional'
})`
  padding: 1.6rem;
`;
