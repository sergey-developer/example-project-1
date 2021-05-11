import styled, { css } from 'styled-components/macro';

import { CloseIcon } from 'components/Icons';
import BaseLanguageSelect from 'components/Select/LanguageSelect';
import mediaQueries from 'styles/media-queries';

export const Container = styled.div`
  ${({ theme }) => css`
    padding: 5.6rem 2rem;
    background-color: ${theme.colors.whiteLilacTwo};
    width: ${theme.common.mobileSidebarWidth};
    height: 100vh;
    ${mediaQueries.greaterThan('md')`
      width: ${theme.common.sidebarWidth};
      height: auto;
      padding: 2.8rem 2rem;
    `}
  `}
`;

export const MobileCloseIcon = styled(CloseIcon)`
  position: absolute;
  cursor: pointer;
  top: 2rem;
  right: 2rem;
  ${mediaQueries.greaterThan('md')`
    display: none;
  `}
`;

export const LanguageSelect = styled(BaseLanguageSelect)`
  margin-bottom: 2.5rem;
`;
