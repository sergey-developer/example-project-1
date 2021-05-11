import styled, { css } from 'styled-components/macro';

import { InfoHint } from 'components/Hints';
import { EmptyImageIcon } from 'components/Icons';
import { LabelFileInput } from 'components/Inputs';
import { Typography } from 'components/Typography';
import { Nullable } from 'shared/types';

export const OuterContainer = styled.div<{ $width?: number; $height?: number }>`
  ${({ $width, $height }) => css`
    width: ${$width}rem;
    height: ${$height}rem;
  `}
`;

export const InnerContainer = styled.div<{
  $width?: number;
  $height?: number;
  imageUrl?: Nullable<string>;
}>`
  ${({ theme, $width, $height, imageUrl }) => css`
    border-radius: 50%;
    width: ${$width}rem;
    height: ${$height}rem;
    border: 0.2rem dashed ${theme.colors.danube};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: ${theme.colors.whiteLilacTwo};
    ${imageUrl &&
    css`
      border: none;
      background-image: url('${imageUrl}');
      background-size: cover;
      background-position: center;
      transition: filter 0.3s, opacity 0.3s;
      & .btn-wrapper {
        opacity: 0;
      }
      &:hover {
        filter: brightness(70%);
        & .btn-wrapper {
          opacity: 1;
        }
      }
    `};
  `}
`;

export const EmptyImage = styled(EmptyImageIcon)``;

export const HintText = styled(Typography).attrs({
  color: 'grayChateauTwo',
  variant: 'subTitle',
  tag: 'span'
})`
  line-height: 1.82rem;
  text-align: center;
`;

export const LabelFileInputStyled = styled(LabelFileInput).attrs({
  tag: 'span',
  color: 'danube',
  variant: 'h6'
})`
  line-height: 1.82rem;
  text-decoration: underline;
`;

export const Info = styled(InfoHint)`
  margin-bottom: -0.5rem;
  margin-left: 0.5rem;
`;

export const EditBtnWrapper = styled.div`
  display: flex;

  & .load-icon {
    margin-right: 0.8rem;
  }
`;

export const FileInput = styled.input.attrs({
  type: 'file'
})`
  display: none;
`;
