import styled, { css } from 'styled-components/macro';

import { TextAreaInput, TextInput } from 'components/Inputs';
import { Typography } from 'components/Typography';

export const Title = styled(Typography).attrs({
  tag: 'span',
  variant: 'h5'
})`
  margin-bottom: 0.5rem;
`;

export const CaptionsText = styled(Typography).attrs({
  tag: 'span',
  variant: 'subTitle',
  noWrap: true,
  color: 'grayChateau'
})``;

export const TitleInput = styled(TextInput).attrs({
  size: 'small'
})`
  margin-bottom: 1rem;
`;

export const DescriptionInput = styled(TextAreaInput).attrs({
  height: 8
})``;
