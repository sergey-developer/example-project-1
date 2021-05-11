import styled, { css } from 'styled-components/macro';

import { Button } from 'components/Buttons';
import GalleryImage from 'components/Gallery/GalleryImage';
import { PageWrapper } from 'components/PageWrapper';
import mediaQueries from 'styles/media-queries';

export const PageContainer = styled(PageWrapper)``;

export const PlusBtn = styled(Button).attrs({
  variant: 'roundMedium'
})`
  ${({ theme }) => css`
    position: fixed;
    top: 4rem;
    right: 2rem;
    cursor: pointer;
    z-index: 20;
    box-shadow: 0px 0.5rem 1.5rem ${theme.colors.greyEight};
    ${mediaQueries.lessThan('md')`
    width: 4.9rem;
    height: 4.9rem;
  `}
  `}
`;
export const GalleryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 13rem);
  gap: 1rem 1rem;
  ${mediaQueries.lessThan('md')`
    grid-template-columns: repeat(auto-fit, 10.8rem);
  `}
`;

export const GalleryItem = styled(GalleryImage)``;
