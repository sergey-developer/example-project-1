import styled, { css } from 'styled-components/macro';

import { Select } from 'components/Select';

export const Container = styled.div`
  display: flex;
  gap: 2.4rem;
`;

export const SelectFilter = styled(Select)`
  width: 18rem;
`;
