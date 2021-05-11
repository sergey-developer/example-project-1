import TimePicker from 'react-time-picker';
import styled, { css } from 'styled-components/macro';

import { TextInput } from 'components/Inputs';

export const Container = styled.div`
  display: flex;
  align-items: center;

  & > .form-input {
    margin-left: auto;
    margin-right: 0.5rem;
  }
`;

// export const TimeInput = styled(TextInput).attrs({
//   size: 'tiny'
// })`
//   width: 6rem;
//   &:first-child {
//   }
// `;

export const TimeInput = styled(TimePicker).attrs({
  clockIcon: null,
  disableClock: true,
  clearIcon: null,
  format: 'HH:mm'
})`
  ${({ theme }) => css`
    & .react-time-picker__wrapper {
      border-radius: 0.5rem;
      width: 6rem;
      padding: 0.5rem;
    }
  `}
`;
