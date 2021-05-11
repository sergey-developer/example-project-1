import React from 'react';
import styled, { css } from 'styled-components/macro';

import MultiSelectSearch, {
  MultiSelectSearchProps
} from 'components/Select/MultiSelectSearch';
import { Typography } from 'components/Typography';
import { mediaQueries } from 'styles/media-queries';

const Wrapper = styled.div`
  & div[class*='control'] {
    border: none;
  }
`;

const LabelDesktop = styled(Typography).attrs({
  color: 'waikawaGray',
  variant: 'subTitleTwo',
  tag: 'span'
})`
  ${mediaQueries.lessThan('md')`
    display: none;
  `}
`;

const LabelMobile = styled(Typography).attrs({
  color: 'waikawaGray',
  variant: 'subTitleTwo',
  tag: 'span'
})`
  display: none;
  margin-bottom: 0.4rem;
  ${mediaQueries.lessThan('md')`
    display: block
   `}
`;

const InputWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    border: 1px solid ${theme.colors.grayChateau};
    border-radius: 0.5rem;
    padding-left: 0.5rem;
    & > div {
      width: 100%;
    }
  `}
`;

interface LangSelectWithLabelProps extends MultiSelectSearchProps {
  label: string;
}

const LangSelectWithLabel: React.FC<LangSelectWithLabelProps> = ({
  label,
  ...rest
}) => {
  return (
    <Wrapper>
      <LabelMobile>{label}</LabelMobile>
      <InputWrapper>
        <LabelDesktop>{label}</LabelDesktop>
        <MultiSelectSearch className='search-select' hasBorder={false} {...rest} />
      </InputWrapper>
    </Wrapper>
  );
};

export default LangSelectWithLabel;
