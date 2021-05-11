import styled from 'styled-components/macro';

import { LanguageSelectProps } from './LanguageSelect';

export const Container = styled.div<Pick<LanguageSelectProps, 'fullWidth'>>`
  ${({ fullWidth }) => `
    width: ${fullWidth ? '100%' : '12rem'};
    min-width: 12rem;
  `}
`;
