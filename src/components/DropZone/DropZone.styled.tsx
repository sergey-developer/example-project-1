import styled, { css } from 'styled-components/macro';

import { LabelFileInput } from 'components/Inputs';
import { Typography } from 'components/Typography';

import { DropZoneVariant } from './DropZone';

export const Container = styled.div<{
  variant: DropZoneVariant;
}>`
  ${({ theme, variant }) => css`
    cursor: pointer;
    border: 0.2rem dashed ${theme.colors.poloBlue};
    padding: 3.7rem 8.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    border-radius: ${theme.common.inputBorderRadius};
    background-color: ${theme.colors.blackSqueeze};
    ${variant === 'photo_modal' &&
    css`
      padding: 15.7rem 6.2rem;
    `}
    & .text {
      margin: 0 1rem 0 0.5rem;
      color: ${theme.colors.kashmirBlueTwo};
      line-height: 2.1rem;
    }
  `}
`;

export const LabelFileInputStyled = styled(LabelFileInput).attrs({
  tag: 'span',
  color: 'danube',
  variant: 'h6'
})`
  text-decoration: underline;
  line-height: 2.1rem;
`;

export const UploadingWrapper = styled.div`
  width: 100%;
  text-align: center;
`;

export const UploadingLabel = styled(Typography).attrs({
  color: 'waikawaGray'
})`
  margin-bottom: 0.6rem;
  line-height: 2.1rem;
`;

export const UploadingProgress = styled.div<{ progress?: number }>`
  ${({ theme, progress }) => css`
    height: 0.3rem;
    background-color: ${theme.colors.periwinkleGrayThree};
    width: 100%;
    border-radius: 0.5rem;
    position: relative;

    &:before {
      content: '';
      border-radius: 0.5rem;
      width: ${progress}%;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      background-color: ${theme.colors.lightGreen};
    }
  `}
`;

export const FileInput = styled.input``;

export const FileLabel = styled.span`
  text-decoration: underline;
`;
