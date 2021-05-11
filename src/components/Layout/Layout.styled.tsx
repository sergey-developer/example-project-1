import styled, { css } from 'styled-components/macro';

import { mediaQueries } from 'styles/media-queries';

import { Header } from './Header';
import PublishProvider from './PublicProvider';
import { Sidebar } from './Sidebar';

export const Container = styled.div<{ noSidebar?: boolean }>`
  ${({ theme, noSidebar }) => css`
    width: 100%;
    height: 100vh;
    min-width: 375px;
    display: grid;
    grid-template-columns: 1fr;
    /* grid-template-rows: ${theme.common.mobileHeaderHeight} 1fr; */
    grid-template-rows: auto auto 1fr;

    position: relative;
    /* prettier-ignore */
    grid-template-areas: 
    'header' 
    'publish-provider'
    'content';

    ${mediaQueries.greaterThan('md')`
      grid-template-rows: auto auto 1fr;
      grid-template-columns: ${theme.common.sidebarWidth} 1fr;
      /* prettier-ignore */
      grid-template-areas: 
      'header header' 
      'publish-provider publish-provider'
      'sidebar content';
    ${
      noSidebar &&
      css`
        /* prettier-ignore */
        grid-template-areas: 
        'header header' 
        'publish-provider publish-provider'
        'content content';
      `
    }
    `}
  `}
`;

export const HeaderStyled = styled(Header)`
  grid-area: header;
`;

export const PublishProviderBox = styled(PublishProvider)`
  grid-area: publish-provider;
`;

export const SidebarStyled = styled(Sidebar)<{ $open?: boolean }>`
  ${({ theme, $open }) => css`
    position: absolute;
    transition: all 0.3s;
    z-index: 2;
    left: -${theme.common.mobileSidebarWidth};
    ${$open &&
    css`
      transform: translateX(${theme.common.mobileSidebarWidth});
    `}
    ${mediaQueries.greaterThan('md')`
      grid-area: sidebar;
      position: static;
      transform: translateX(0);
  `};
  `}
`;

export const ContentWrapper = styled.div`
  grid-area: content;
  padding: 3rem 2rem 3rem 3rem;
`;
