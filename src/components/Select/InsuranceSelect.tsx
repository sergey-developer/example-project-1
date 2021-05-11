import MiniSearch from 'minisearch';
import React, { useMemo, useRef } from 'react';
import Select from 'react-select/async';
import useToggle from 'react-use/lib/useToggle';

import { Nullable } from 'shared/types/common';
import { InsuranceWithSubdivision } from 'shared/types/model/insurance/InsuranceWithSubdivisions';
import { ChangeSelectInsurancesPayload } from 'state/ducks/providerProfile';

import InsuranceOptions from './InsuranceOptions';
import { customStyles } from './InsuranceSelect.styled';
import InsuranceSelectValueLabel from './InsuranceSelectValueLabel';

interface InsuranceSelectProps {
  options: InsuranceWithSubdivision[];
  selectedInsurances: {
    insuranceId?: string | null;
    subdivisionId?: string | null;
  }[];
  onChange?: (payload: ChangeSelectInsurancesPayload) => void;

  onDoubleClick?: () => void;
  placeholder?: string;
  isLoading?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  hasBorder?: boolean;
}

export interface OptionsType extends InsuranceOption {}

type InsuranceOption = {
  id: string;
  value: string;
  insuranceId: Nullable<string>;
  insuranceName: Nullable<string>;
  subdivisionName: Nullable<string>;
  subdivisionId: Nullable<string>;
};

const InsuranceSelect: React.FC<InsuranceSelectProps> = ({
  options,
  onChange = () => {},
  selectedInsurances,
  onDoubleClick,
  placeholder,
  isLoading,
  disabled,
  readonly = false,
  hasBorder = true
}) => {
  const [isReadonly, toggleReadonly] = useToggle(readonly);
  const searchRef = useRef<MiniSearch<InsuranceOption>>();

  React.useEffect(() => {
    toggleReadonly(readonly);
  }, [readonly]);

  const handleDoubleClick = () => {
    !readonly && toggleReadonly(false);
    onDoubleClick && onDoubleClick();
  };

  const optionsMemo = useMemo<InsuranceOption[]>(() => {
    return options.reduce<InsuranceOption[]>((acc, value) => {
      const insuranceName = value.insurance.name;
      const insuranceId = value.insurance.id;

      return acc.concat(
        value.insuranceSubdivision.map(item => ({
          id: `${insuranceId}-${item.id}`,
          value: `${insuranceId}-${item.id}`,
          insuranceName,
          insuranceId,
          subdivisionName: item.name,
          subdivisionId: item.id
        }))
      );
    }, []);
  }, [options]);

  const mapOptionMemo = useMemo(() => {
    return optionsMemo.reduce((acc, item) => {
      acc.set(item.id, item);
      return acc;
    }, new Map<string, InsuranceOption>());
  }, [optionsMemo]);

  const selectedValues: any = useMemo(
    () =>
      selectedInsurances.map(item =>
        mapOptionMemo.get(`${item.insuranceId}-${item.subdivisionId}`)
      ),
    [selectedInsurances, mapOptionMemo]
  );

  React.useEffect(() => {
    if (!!optionsMemo.length) {
      let miniSearch = new MiniSearch<InsuranceOption>({
        fields: ['subdivisionName'], // fields to index for full-text search
        storeFields: ['id'] // fields to return with search results
      });
      miniSearch.addAll(optionsMemo);

      searchRef.current = miniSearch;
    }
  }, [optionsMemo]);

  const loadOptions = (inputValue: string, options: any) => {
    const searchKeys = searchRef.current?.search(inputValue, { prefix: true }) || [];
    const searchOptions = searchKeys.map(item => mapOptionMemo.get(item.id));
    options(searchOptions);
  };

  const handleOptionsChange = (insurances: any) => {
    onChange({
      insurances
    });
  };

  return (
    <div onDoubleClick={handleDoubleClick}>
      <Select<InsuranceOption, true>
        isMulti
        styles={customStyles}
        loadOptions={loadOptions}
        defaultOptions={optionsMemo}
        value={selectedValues}
        onChange={handleOptionsChange}
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
        components={{
          MultiValueLabel: InsuranceSelectValueLabel,
          Option: InsuranceOptions
        }}
      />
    </div>
  );
};

export default InsuranceSelect;
