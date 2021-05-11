import { nanoid } from '@reduxjs/toolkit';
import MiniSearch from 'minisearch';
import React, { useEffect, useMemo, useRef } from 'react';
import { StylesConfig } from 'react-select';
import Select from 'react-select/async';
import useToggle from 'react-use/lib/useToggle';
import { useTheme } from 'styled-components';

import { ProvidersWithTaxonomyDto } from 'shared/types/generate';
import { SpecialtyWithTaxonomyRecord } from 'shared/types/model/specialty';
import { ChangeSelectSpecialitiesPayload } from 'state/ducks/providerProfile';

import { Container, customStyles } from './SpecialitiesSelect.styled';

export interface OptionsType {
  id: number;
  label: string;
  value: number;
}

interface SpecialtiesSelectProps {
  options: ProvidersWithTaxonomyDto[];
  className?: string;
  selectedValues: number[];
  onChange: (payload: number[]) => void;
  onDoubleClick?: () => void;
  placeholder?: string;
  isLoading?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  hasBorder?: boolean;
}

const SpecialtiesSelect: React.FC<SpecialtiesSelectProps> = ({
  options,
  selectedValues,
  className,
  onChange = () => {},
  onDoubleClick,
  placeholder,
  isLoading,
  disabled,
  readonly = false,
  hasBorder
}) => {
  const searchRef = useRef<MiniSearch<OptionsType>>();
  const [isReadonly, toggleReadonly] = useToggle(readonly);

  React.useEffect(() => {
    toggleReadonly(readonly);
  }, [readonly]);

  const handleDoubleClick = () => {
    !readonly && toggleReadonly(false);
    onDoubleClick && onDoubleClick();
  };

  const optionsMemo: OptionsType[] = useMemo<OptionsType[]>(
    () =>
      options.reduce((acc, item) => {
        if (item.id && item.text) {
          acc.push({
            id: item.id,
            value: item.id,
            label: item.text
          });
        }
        return acc;
      }, new Array()),
    [options]
  );

  const mapOptionsMemo = useMemo(
    () =>
      optionsMemo.reduce(
        (acc, item) => acc.set(item.id, item),
        new Map<number, OptionsType>()
      ),
    [optionsMemo]
  );

  const selectValuesMemo = useMemo(
    () =>
      selectedValues.map(value => {
        const option = mapOptionsMemo.get(value);
        return {
          id: value,
          label: option?.label || '',
          value: option?.id
        };
      }),
    [selectedValues, mapOptionsMemo]
  );

  useEffect(() => {
    if (!!optionsMemo.length) {
      let miniSearch = new MiniSearch<OptionsType>({
        fields: ['label'], // fields to index for full-text search
        storeFields: ['id'] // fields to return with search results
      });
      miniSearch.addAll(optionsMemo);

      searchRef.current = miniSearch;
    }
  }, [optionsMemo]);

  const loadOptions = (inputValue: string, options: any) => {
    const searchKeys = searchRef.current?.search(inputValue, { prefix: true }) || [];
    const searchOptions = searchKeys.map(item => mapOptionsMemo.get(item.id));
    options(searchOptions);
  };

  const handleChange = (select: any) => {
    const selectSpecialties = select as OptionsType[];
    onChange(selectSpecialties.map(item => item.id));
  };

  return (
    <Container className={className} onDoubleClick={handleDoubleClick}>
      <Select<OptionsType, true>
        isMulti
        styles={customStyles}
        defaultOptions={optionsMemo}
        loadOptions={loadOptions}
        onChange={handleChange}
        //@ts-ignore
        value={selectValuesMemo}
        isLoading={isLoading}
        placeholder={placeholder}
        isDisabled={isReadonly || disabled}
        hasBorder={hasBorder}
        readOnly={isReadonly}
        theme={theme => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: 'transparent'
          }
        })}
      />
    </Container>
  );
};

export default SpecialtiesSelect;
