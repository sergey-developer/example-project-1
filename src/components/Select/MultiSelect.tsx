import React from 'react';
import { OptionTypeBase, StylesConfig } from 'react-select';
import Select from 'react-select/async';
import { useTheme } from 'styled-components';

import { CustomValueLabel } from './CustomValueLabel';
import { Container } from './MultiSelect.styled';

export interface OptionsType extends OptionTypeBase {
  subTitle?: string;
  value: string | number;
  label: string;
}

interface MultiSelectProps {
  selectValues?: OptionsType[];
}

export const MultiSelect: React.FC<MultiSelectProps> = ({ selectValues }) => {
  const theme = useTheme();

  const testOptions = [
    { value: 'one', label: 'United IL LLC', id: 1 },
    { value: 'two', label: 'Two', id: 2 },
    { value: 'three', label: 'Three', id: 3 }
  ];

  const customStyles: StylesConfig<OptionsType, true> = {
    control: provided => ({
      ...provided,
      borderColor: theme.colors.geyser,

      '&:hover, &:active, &:visited': {
        borderColor: theme.colors.geyser,
        boxShadow: `0 0 0 0.1rem ${theme.colors.lightGreen}`
      }
    }),
    indicatorsContainer: () => ({ display: 'none' }),
    multiValue: (provided, state) => {
      return {
        ...provided,
        borderRadius: '10rem',
        padding: '0.6rem 0.8rem',
        backgroundColor: theme.colors.catskillWhite
      };
    },
    multiValueLabel: provider => ({
      ...provider,
      ...theme.fonts.default,
      padding: 0
    }),
    multiValueRemove: provider => ({
      ...provider,
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.colors.catskillWhite
      },
      '& svg': {
        color: theme.colors.warn
      }
    })
  };

  const loadOptions = (inputValue: string, options: any) => {
    setTimeout(() => {
      options(testOptions);
    }, 2000);
  };

  return (
    <Container>
      <Select
        isMulti
        styles={customStyles}
        loadOptions={loadOptions}
        onChange={e => console.log(e)}
        // defaultOptions
        value={selectValues}
        theme={theme => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: 'transparent'
          }
        })}
        components={{
          MultiValueLabel: CustomValueLabel
        }}
      />
    </Container>
  );
};
