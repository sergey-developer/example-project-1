import styled from 'styled-components/macro';

import { Typography } from 'components/Typography';

import { ReviewStatus as BaseReviewStatus } from '../ReviewStatus';

export const Container = styled.div`
  display: flex;

  & > :not(:last-child) {
    margin-right: 12px;
  }
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Name = styled(Typography).attrs({
  tag: 'span',
  variant: 'body'
})``;

export const DetailsMeta = styled.div`
  display: flex;
  align-items: center;

  & > :not(:last-child) {
    margin-right: 5px;
  }
`;

export const DelimiterDot = styled.span`
  width: 5px;
  height: 5px;

  border-radius: 50%;

  background-color: ${({ theme }) => theme.colors.grayChateau};
`;

export const ReviewStatus = styled(BaseReviewStatus)`
  width: max-content;

  margin-bottom: 4px;
`;
