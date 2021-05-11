import styled, { css } from 'styled-components/macro';

import { TextInput } from 'components/Inputs';
import { Typography } from 'components/Typography';

export const DegreeInput = styled(TextInput).attrs({
  size: 'small'
})`
  margin-right: 1rem;
`;

export const GraduatedInput = styled(TextInput).attrs({
  size: 'small',
  color: 'grayChateau'
})``;

export const SchoolNameInput = styled(TextInput).attrs({
  size: 'small'
})`
  margin-top: 1rem;
`;

export const DegreeValue = styled(Typography).attrs({
  tag: 'div',
  variant: 'h5'
})`
  margin-bottom: 0.4rem;
  white-space: nowrap;
`;

export const GraduatedValue = styled(Typography).attrs({
  variant: 'subTitleTwo'
})`
  ${({ theme }) => css`
    color: ${theme.colors.grayChateau};
    flex-shrink: 0;
  `}
`;

export const SchoolNameValue = styled(Typography).attrs({
  variant: 'subTitleTwo',
  tag: 'span'
})`
  margin-right: 1.2rem;
  white-space: nowrap;
`;

export const Row = styled.div`
  display: flex;
`;
