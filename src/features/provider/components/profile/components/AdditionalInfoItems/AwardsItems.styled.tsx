import styled, { css } from 'styled-components/macro';

import { TextInput } from 'components/Inputs';
import { Typography } from 'components/Typography';

export const NameInput = styled(TextInput).attrs({
  size: 'small'
})`
  margin-bottom: 1rem;
`;

export const YearInput = styled(TextInput).attrs({
  size: 'small',
  color: 'grayChateau'
})``;

export const NameValue = styled(Typography).attrs({
  variant: 'subTitleTwo',
  tag: 'div'
})`
  margin-bottom: 0.5rem;
  white-space: nowrap;
`;

export const YearValue = styled(Typography).attrs({
  variant: 'subTitleTwo',
  tag: 'div'
})`
  ${({ theme }) => css`
    color: ${theme.colors.grayChateau};
    white-space: nowrap;
  `}
`;
