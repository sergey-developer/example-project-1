import { Link as RouterLink } from 'react-router-dom';
import styled, { css } from 'styled-components/macro';

import { Typography } from 'components/Typography';
import mediaQueries from 'styles/media-queries';

export const Title = styled(Typography).attrs({
  variant: 'h3Two'
})`
  margin-bottom: 2.4rem;
`;

export const Container = styled.div`
  ${({ theme }) => css`
    padding: 1.6rem;
    box-shadow: 0px 0px 2px ${theme.colors.greySeven},
      0px 2px 24px ${theme.colors.greySeven};
    border-radius: 1.2rem;
    margin-bottom: 3rem;
    ${mediaQueries.greaterThan('md')`
      padding: 2.4rem;
    `}
  `}
`;

export const StyledLink = styled(Typography).attrs({
  tag: 'a',
  variant: 'h5',
  color: 'glacier'
})``;

export const Link = styled(RouterLink)`
  ${({ theme }) => css`
    ${css(theme.fonts.subTitleTwo)};
    color: ${theme.colors.glacier};
  `}
`;
