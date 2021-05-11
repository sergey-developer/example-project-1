import React from 'react';
import ReactSelect, {
  OptionTypeBase,
  Props as ReactSelectProps,
  StylesConfig,
  mergeStyles
} from 'react-select';

import theme from 'styles/theme';

import { Spinner } from '../Spinner';

export type SelectOptionType = OptionTypeBase;

const customStyles: StylesConfig<OptionTypeBase, false> = {
  container: (base, state) => ({
    ...base,
    minWidth: `${state.selectProps.minWidth ? state.selectProps.minWidth : 12}rem`
  }),
  control: (base, state) => {
    const props = state.selectProps;
    const borderColor = props.isDisabled
      ? 'transparent'
      : props.menuIsOpen
      ? theme.colors.lightGreen
      : theme.colors.grayChateau;

    return {
      ...base,
      minHeight: '4.6rem',
      borderColor,
      backgroundColor: props.isDisabled ? theme.colors.wildSand : 'white',
      boxShadow: 'none',
      cursor: 'pointer',
      '&:hover': {
        borderColor: props.menuIsOpen
          ? theme.colors.lightGreen
          : theme.colors.grayChateau
      }
    };
  },
  indicatorsContainer: () => ({
    display: 'flex',
    alignItems: 'center',
    paddingRight: '1rem'
  }),
  indicatorSeparator: () => ({
    display: 'none'
  }),
  valueContainer: base => ({
    ...base,
    padding: '0.75rem 1.5rem'
  }),
  placeholder: base => ({
    ...base,
    color: theme.colors.grayChateau,
    ...theme.fonts.subTitleTwo
  }),
  singleValue: base => ({
    ...base,
    ...theme.fonts.subTitleTwo
  }),
  menu: base => ({ ...base, top: '83%' }),
  menuList: base => ({
    ...base,
    padding: 0,
    backgroundColor: 'white',
    boxShadow: '0 0.6rem 1.2rem rgba(0, 0, 0, 0.08)',
    borderRadius: '0.5rem'
  }),
  option: (base, state) => ({
    ...base,
    ...theme.fonts.subTitleTwo,
    padding: '1.2rem 1.5rem',
    minHeight: '4.2rem',
    cursor: 'pointer',
    backgroundColor: state.isSelected ? theme.colors.wildSand : 'unset',
    color: 'black',
    '&:active': {
      backgroundColor: 'unset'
    }
  })
};

const customComponents = {
  LoadingIndicator: () => <Spinner size='sm' />
};

type SelectProps = ReactSelectProps<OptionTypeBase> & {
  minWidth?: number;
};

const Select: React.FC<SelectProps> = ({
  minWidth,
  styles,
  isSearchable = false,
  ...props
}) => {
  return (
    <ReactSelect
      styles={styles ? mergeStyles(customStyles, styles) : customStyles}
      components={customComponents}
      isSearchable={isSearchable}
      minWidth={minWidth}
      {...props}
    />
  );
};

export default Select;
