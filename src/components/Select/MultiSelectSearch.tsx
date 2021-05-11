import MiniSearch from 'minisearch';
import React, { useEffect, useMemo, useRef } from 'react';
import Select from 'react-select/async';
import useToggle from 'react-use/lib/useToggle';

import { Nullable } from 'shared/types';

import { customStyles } from './MultiSelectSearch.styled';

export type MultiSelectSearchOption = {
  label?: Nullable<string>;
  value?: Nullable<string>;
  id?: Nullable<string>;
};

export interface MultiSelectSearchProps {
  options: MultiSelectSearchOption[];
  className?: string;
  values: MultiSelectSearchOption[];
  onChange?: (values: MultiSelectSearchOption[]) => void;
  onDoubleClick?: () => void;
  placeholder?: string;
  isLoading?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  hasBorder?: boolean;
}

const MultiSelectSearch: React.FC<MultiSelectSearchProps> = ({
  options,
  className,
  values,
  onChange = () => {},
  onDoubleClick,
  placeholder,
  isLoading,
  disabled,
  readonly = false,
  hasBorder
}) => {
  const [isReadonly, toggleReadonly] = useToggle(readonly);
  const searchRef = useRef<MiniSearch<MultiSelectSearchOption>>();

  useEffect(() => {
    toggleReadonly(readonly);
  }, [readonly]);

  const handleDoubleClick = () => {
    !readonly && toggleReadonly(false);
    onDoubleClick && onDoubleClick();
  };

  const mapOptionMemo = useMemo(() => {
    return options.reduce((acc, item) => {
      if (item.id) {
        acc.set(item.id, item);
      }
      return acc;
    }, new Map<string, MultiSelectSearchOption>());
  }, [options]);

  useEffect(() => {
    if (options?.length) {
      let miniSearch = new MiniSearch<MultiSelectSearchOption>({
        fields: ['label', 'value'], // fields to index for full-text search
        storeFields: ['id'] // fields to return with search results
      });

      miniSearch.addAll(options);

      searchRef.current = miniSearch;
    }
  }, [options]);

  const selectValues = values.reduce((acc, item) => {
    if (item?.value) {
      acc.push(mapOptionMemo.get(item.value));
    }
    return acc;
  }, new Array());

  const loadOptions = (inputValue: string, options: any) => {
    const searchKeys = searchRef.current?.search(inputValue, { prefix: true }) || [];

    const searchOptions = searchKeys.map(item => mapOptionMemo.get(item.id));
    options(searchOptions);
  };

  return (
    <div onDoubleClick={handleDoubleClick}>
      <Select<MultiSelectSearchOption, true>
        className={className}
        isMulti
        loadOptions={loadOptions}
        styles={customStyles}
        isLoading={isLoading}
        placeholder={placeholder}
        isDisabled={isReadonly || disabled}
        hasBorder={hasBorder}
        readOnly={isReadonly}
        defaultOptions={options}
        value={selectValues}
        //@ts-ignore
        onChange={onChange}
        theme={theme => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: 'transparent'
          }
        })}
      />
    </div>
  );
};

export default MultiSelectSearch;
