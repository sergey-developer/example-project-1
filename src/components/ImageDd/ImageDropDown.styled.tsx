import styled, { css } from 'styled-components/macro';

import { EmptyImageIcon } from 'components/Icons';
import { Nullable } from 'shared/types';

export const Container = styled.div<{
  width: number;
  height: number;
  $imageSrc?: Nullable<string>;
}>`
  ${({ theme, width, height, $imageSrc }) => css`
    width: ${width}rem;
    height: ${height}rem;
    position: relative;
    border-radius: ${theme.common.inputBorderRadius};
    border: 0.2rem dashed ${theme.colors.hippieBlue};
    background-size: cover;
    transition: all 0.3s;
    & .delete-btn {
      margin-left: 0.4rem;
    }
    & .btn-wrapper {
      opacity: 0;
    }
    ${$imageSrc &&
    css`
      background-image: url('${$imageSrc}');
      border: none;
      &:hover {
        filter: brightness(80%);
        & .btn-wrapper {
          opacity: 1;
        }
      }
    `}
  `}
`;

export const LoadImage = styled.input.attrs({
  type: 'file',
  accept: 'image/*'
})`
  display: none;
`;

export const EmptyIcon = styled(EmptyImageIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const EditBtnW = styled.div`
  display: flex;
  width: 100%;
  padding: 0.4rem;
  justify-content: flex-end;
`;
