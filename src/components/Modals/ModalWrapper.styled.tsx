import { DialogContent, DialogOverlay } from '@reach/dialog';
import styled, { css } from 'styled-components/macro';

import { CloseIcon } from 'components/Icons';
import mediaQueries from 'styles/media-queries';
import { ColorType } from 'styles/theme';

export const Overlay = styled(DialogOverlay)`
  display: flex;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  z-index: 10;
`;

export const Content = styled(DialogContent)<{
  $maxWidth?: number;
  $backgroundColor: ColorType;
}>`
  ${({ theme, $maxWidth, $backgroundColor }) => css`
    &[data-reach-dialog-content] {
      position: relative;
      margin-left: 2rem;
      margin-right: 2rem;
      margin-bottom: auto;
      width: 100%;

      max-width: ${$maxWidth || 100}rem;
      background: ${theme.colors[$backgroundColor]};
      padding: 3rem;
      border-radius: 0.5rem;
      ${mediaQueries.lessThan('md')`
        padding: 2rem;
      `}
    }
  `}
`;

export const CloseBtn = styled(CloseIcon).attrs({
  size: 'small',
  color: 'glacier'
})`
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
`;
