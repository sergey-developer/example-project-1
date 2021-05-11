import { StylesConfig } from 'react-select';
import styled, { css } from 'styled-components/macro';

import theme from 'styles/theme';

import { OptionsType } from './SpecialitiesSelect';

export const Container = styled.div``;

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
  multiValue: (provided, state) => {
    const props = state.selectProps;
    const isDisabled = props.isDisabled;
    return {
      ...provided,
      borderRadius: '10rem',
      padding: '0.6rem 0.8rem',
      backgroundColor: theme.colors.catskillWhite,
      '&>div': isDisabled && {
        paddingRight: '6px'
      }
    };
  },
  multiValueLabel: provider => ({
    ...provider,
    ...theme.fonts.default,
    padding: 0
  }),
  multiValueRemove: (provider, state) => {
    const props = state.selectProps;
    const isDisabled = props.isDisabled;

    if (isDisabled) {
      return {
        display: 'none'
      };
    }
    return {
      ...provider,
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
