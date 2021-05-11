import styled from 'styled-components/macro';

import { SpinnerProps } from './Spinner';

export const Container = styled.div<Pick<SpinnerProps, 'overScreen'>>`
  ${({ overScreen }) => `
    ${
      overScreen
        ? `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `
        : `
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    `
    }
  `}
`;
