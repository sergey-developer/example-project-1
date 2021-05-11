import styled from 'styled-components/macro';

export const Icon = styled.svg.attrs<{
  version: string;
}>({
  version: '1.1',
  xmlns: 'http://www.w3.org/2000/svg',
  xmlnsXlink: 'http://www.w3.org/1999/xlink'
})<{
  ref?: any;
}>``;
