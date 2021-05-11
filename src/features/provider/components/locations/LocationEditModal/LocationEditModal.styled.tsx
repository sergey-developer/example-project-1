import styled, { css } from 'styled-components/macro';

import { Button } from 'components/Buttons';
import { TextInput } from 'components/Inputs';
import { ModalWrapper } from 'components/Modals';
import { Typography } from 'components/Typography';
import mediaQueries from 'styles/media-queries';

import { DayWithTime } from './components/DayWithTime';

export const Container = styled(ModalWrapper).attrs({
  maxWidth: 84.7
})``;

export const Head = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2.4rem;
  ${mediaQueries.greaterThan('md')`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `}
`;

export const Title = styled(Typography).attrs({})`
  ${mediaQueries.lessThan('md')`
    margin-bottom: 1.2rem;
  `}
`;

export const AddressUseBtn = styled(Button).attrs({
  $size: 'small',
  variant: 'additional'
})`
  max-width: 31rem;
`;

export const Row = styled.div<{
  $column?: number | (number | null)[];
  $gap?: number;
  $spaceButton?: number;
}>`
  ${({ $column, $gap, $spaceButton }) => css`
    display: grid;
    ${typeof $column === 'number' &&
    `grid-template-columns: repeat(${$column || 1}, 1fr);`}
    ${Array.isArray($column) &&
    `grid-template-columns: ${$column
      .map(item => (item ? `${item}%` : '1fr'))
      .join(' ')};`}
    gap: ${$gap ?? 1.6}rem;
    margin-bottom: ${$spaceButton ? $spaceButton : 2.4}rem;
    ${mediaQueries.lessThan('md')`
      grid-template-columns: 1fr;
    `}
  `}
`;

export const Column = styled.div``;

export const InputLabel = styled(Typography).attrs({
  color: 'waikawaGray',
  variant: 'subTitleTwo',
  tag: 'label'
})`
  display: block;
  margin-bottom: 0.4rem;
`;

export const ColumnLabel = styled(Typography).attrs({
  color: 'waikawaGray',
  variant: 'subTitleTwo',
  tag: 'div'
})`
  margin-bottom: 1.4rem;
`;

export const ContactColumn = styled.div`
  padding-right: 3rem;
  ${mediaQueries.lessThan('md')`
     padding-right: 0;
  `}
`;

export const WorkingHoursColumn = styled.div`
  ${({ theme }) => css`
    padding: 0 3rem;
    border-left: 0.1rem solid ${theme.colors.wildSand};
    border-right: 0.1rem solid ${theme.colors.wildSand};

    ${mediaQueries.lessThan('md')`
      border: none;
      padding: 0;
    `}
  `}
`;

export const SocialColumn = styled.div`
  padding-left: 3rem;
  ${mediaQueries.lessThan('md')`
     padding-left: 0;
  `}
`;

export const DayWithTimeStyle = styled(DayWithTime)`
  margin-bottom: 1rem;
  max-width: 23.4rem;
`;

export const SocialInput = styled(TextInput)`
  margin-bottom: 1rem;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: center;
  & > button:first-child {
    margin-right: 1.2rem;
  }
`;

export const MapSwitchLabel = styled(Typography).attrs({
  variant: 'label',
  color: 'glacier'
})`
  text-decoration: underline;
  cursor: pointer;
`;
