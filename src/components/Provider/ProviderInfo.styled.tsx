import styled from 'styled-components/macro';

import { AvatarImage } from 'components/Avatar';
import { Typography } from 'components/Typography';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  padding-left: 1.2rem;
`;

export const Avatar = styled(AvatarImage)`
  margin-bottom: 0.8rem;
`;

export const Label = styled(Typography)`
  margin-bottom: 0.3rem;
`;

export const Title = styled(Typography)`
  overflow-wrap: break-word;
`;
