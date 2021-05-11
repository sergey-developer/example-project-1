import styled, { css } from 'styled-components/macro';

import { TextInput } from 'components/Inputs';
import { Typography } from 'components/Typography';

import { Item } from './Common.styled';

export const NameInput = styled(TextInput)`
  margin-bottom: 1rem;
`;

export const WebSiteInput = styled(TextInput)``;

export const ItemW = styled(Item)`
  min-height: auto;
`;

export const NameValue = styled(Typography).attrs({
  variant: 'h5'
})`
  margin-bottom: 0.4rem;
  white-space: nowrap;
`;

export const WebSiteValue = styled(Typography).attrs({
  color: 'glacier',
  variant: 'subTitleTwo'
})`
  white-space: nowrap;
`;
