import React from 'react';
import styled, { css } from 'styled-components/macro';

import { Typography } from 'components/Typography';
import { MultiValueGenericProps } from 'react-select/src/components/MultiValue';

import { OptionsType } from './InsuranceSelect';

const Container = styled.div``;

interface InsuranceSelectValueLabelProps
  extends MultiValueGenericProps<OptionsType> {}

const InsuranceSelectValueLabel: React.FC<InsuranceSelectValueLabelProps> = ({
  data
}) => {
  return (
    <Container>
      <Typography variant='h5' tag='div' color='greySix'>
        {data.insuranceName}
      </Typography>
      <Typography variant='caption' tag='div' color='grayChateau'>
        {data.subdivisionName}
      </Typography>
    </Container>
  );
};

export default InsuranceSelectValueLabel;
