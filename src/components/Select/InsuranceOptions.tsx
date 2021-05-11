import React from 'react';
import { InnerRef } from 'react-select';
import styled, { css } from 'styled-components/macro';

import { Typography } from 'components/Typography';

import { OptionsType } from './InsuranceSelect';

const Option = styled(Typography)`
  ${({ theme }) => css`
    padding: 1.2rem 1.5rem;
    transition: background-color 0.3s;
    &:hover {
      background-color: ${theme.colors.wildSand};
    }
  `}
`;

interface InsuranceOptionsProps {
  data: OptionsType;
  innerRef: InnerRef;
  innerProps: any;
}

const InsuranceOptions: React.FC<InsuranceOptionsProps> = ({
  data,
  innerProps,
  innerRef
}) => {
  return (
    <Option ref={innerRef} {...innerProps}>
      {data.subdivisionName}
    </Option>
  );
};

export default InsuranceOptions;
