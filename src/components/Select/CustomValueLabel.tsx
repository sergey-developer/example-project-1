import React from 'react';
import styled from 'styled-components/macro';

import { Typography } from 'components/Typography';
import { MultiValueGenericProps } from 'react-select/src/components/MultiValue';

import { OptionsType } from './MultiSelect';

const Container = styled.div``;

interface CustomValueLabelProps extends MultiValueGenericProps<OptionsType> {}

export const CustomValueLabel: React.FC<CustomValueLabelProps> = ({
  data,
  innerProps
}) => {
  if (data.subTitle) {
    return (
      <Container {...innerProps}>
        <Typography variant='h6' tag='div'>
          {data.label}
        </Typography>
        <Typography variant='caption' tag='div' color='kashmirBlue'>
          {data.subTitle}
        </Typography>
      </Container>
    );
  }
  return <Container {...innerProps}>{data?.label}</Container>;
};
