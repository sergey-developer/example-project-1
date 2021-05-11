import styled, { css } from 'styled-components/macro';

import { AvatarEditable } from 'components/Avatar';
import { InfoHint } from 'components/Hints';
import { EmptyImageIcon } from 'components/Icons';
import { LabelFileInput } from 'components/Inputs';
import { Spinner } from 'components/Spinner';
import { Typography } from 'components/Typography';
import { Nullable } from 'shared/types';

export const Container = styled.div<{
  isSelfEmployed?: boolean;
  imageUrl?: Nullable<string>;
}>`
  ${({ theme, isSelfEmployed, imageUrl }) => css`
    width: 80rem;
    height: 35rem;
    background-color: ${theme.colors.whiteLilacTwo};
    padding-left: 23.6rem;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px dashed ${theme.colors.glacier};
    border-radius: 5px;
    ${isSelfEmployed &&
    css`
      border: none;
      background-color: transparent;
      height: 25rem;
    `}
    ${imageUrl &&
    !isSelfEmployed &&
    css`
      border: none;
      background-image: url('${imageUrl}');
      background-size: cover;
      background-position: center;
      transition: filter 0.3s, opacity 0.3s;
      & > .btn-wrapper {
        opacity: 0;
      }
      &:hover {
        filter: brightness(70%);
        & > .btn-wrapper {
          opacity: 1;
        }
      }
    `}
  `}
`;

export const Avatar = styled(AvatarEditable)`
  position: absolute;
  /* top: 2.05rem; */
  left: 2.8rem;
  bottom: 3rem;
`;

export const EmptyImage = styled(EmptyImageIcon)``;

export const OpenFileDialog = styled(LabelFileInput).attrs({
  tag: 'span',
  color: 'danube',
  variant: 'h6'
})`
  line-height: 1.82rem;
  cursor: pointer;
  text-decoration: underline;
`;

export const Info = styled(InfoHint)`
  margin-bottom: -0.5rem;
  margin-left: 0.5rem;
`;

export const CoverHint = styled(Typography).attrs({
  color: 'grayChateauTwo',
  variant: 'subTitle',
  tag: 'span'
})``;

export const AvatarInput = styled.input.attrs({
  type: 'file'
})`
  display: none;
`;

export const CoverInput = styled.input.attrs({
  type: 'file'
})`
  display: none;
`;

export const EditBtnWrapper = styled.div`
  display: flex;
  position: absolute;
  padding: 0.5rem;
  top: 0;
  right: 0;
  & > .load-btn {
    margin-right: 0.5rem;
  }
`;

export const FileInput = styled.input.attrs({
  type: 'file'
})`
  display: none;
`;

export const SpinnerCover = styled(Spinner).attrs({
  size: 'md',
  fullwidth: true
})``;
