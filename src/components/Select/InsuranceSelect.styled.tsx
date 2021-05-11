import { StylesConfig } from 'react-select';
import styled from 'styled-components/macro';

import theme from 'styles/theme';

import { OptionsType } from './InsuranceSelect';

export const customStyles: StylesConfig<OptionsType, true> = {
  control: (provided, state) => {
    const props = state.selectProps;
    const borderColor = props.isDisabled
      ? props.readOnly
        ? theme.colors.grayChateau
        : 'transparent'
      : props.menuIsOpen
      ? theme.colors.lightGreen
      : theme.colors.grayChateau;

    return {
      ...provided,
      minHeight: '4.6rem',
      pointerEvents: 'auto',
      borderColor: props.hasBorder ? borderColor : 'transparent',
      backgroundColor:
        props.isDisabled && !props.readOnly ? theme.colors.wildSand : 'white',
      '&:hover': {
        borderColor: theme.colors.grayChateau
      }
    };
  },
  indicatorsContainer: () => ({ display: 'none' }),
  valueContainer: base => ({
    ...base,
    padding: '0.75rem 1.5rem'
  }),
  placeholder: base => ({
    ...base,
    color: theme.colors.grayChateau,
    ...theme.fonts.subTitleTwo
  }),
  multiValue: provided => ({
    ...provided,
    borderRadius: '10rem',
    padding: '0.6rem 1.4rem',
    backgroundColor: theme.colors.whiteLilacTwo,
    marginRight: '1rem'
  }),
  multiValueLabel: provider => ({
    ...provider,
    ...theme.fonts.default,
    padding: 0
  }),
  multiValueRemove: (base, props) => {
    return {
      ...base,
      ...(props.selectProps.isDisabled && {
        pointerEvents: 'none',
        display: 'none'
      }),
      marginLeft: '1rem',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.colors.catskillWhite
      },
      '& svg': {
        color: theme.colors.warn
      }
    };
  }
};
