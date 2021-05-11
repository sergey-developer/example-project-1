import styled, { css } from 'styled-components/macro';

import { Typography } from 'components/Typography';
import mediaQueries from 'styles/media-queries';

import { ReviewProps } from './Review';

const replyStyles = css`
  ${({ theme }) => `
    padding: 16px;

    background-color: ${theme.colors.whiteLilacTwo};
    
    border-radius: 12px;
  `}
`;

export const Wrapper = styled.div<Pick<ReviewProps, 'kind'>>`
  ${({ kind }) => kind === 'reply' && replyStyles}

  & > :not(:last-child) {
    margin-bottom: 10px;
  }
`;

export const OuterContainer = styled.div<{ $maxHeight: ReviewProps['maxHeight'] }>`
  ${({ $maxHeight }) => `
    ${
      $maxHeight &&
      `
       max-height: ${$maxHeight}px;
       overflow: hidden;
    `
    }
  `}
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > :not(:last-child) {
    margin-right: 10px;
  }
`;

export const HeaderRightSide = styled.div`
  display: flex;
  align-items: center;

  & > :not(:last-child) {
    margin-right: 20px;
  }

  ${mediaQueries.lessThan('sm')`
    ${css`
      flex-direction: column;

      & > :not(:last-child) {
        margin-right: 0;
        margin-bottom: 12px;
      }
    `}
  `}
`;

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;

  & > :not(:last-child) {
    margin-right: 12px;
  }
`;

export const RatingMessage = styled(Typography).attrs({
  tag: 'span',
  variant: 'subTitleTwo',
  color: 'warn',
  align: 'center'
})``;

export const ReviewComment = styled(Typography).attrs({
  tag: 'p',
  variant: 'label'
})`
  line-height: 25px;

  color: #5a606f;

  margin-top: 15px;
`;

export const ShowAll = styled(Typography).attrs({
  tag: 'span',
  cursor: 'pointer',
  variant: 'label',
  color: 'glacier'
})`
  width: max-content;
`;
