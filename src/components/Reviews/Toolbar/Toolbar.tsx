import _debounce from 'lodash.debounce';
import React from 'react';

import { ReactComponent as SearchIcon } from 'assets/icons/SearchIcon.svg';
import { Nullable } from 'shared/types';
import { ReviewsSortOrderUnion } from 'shared/types/generate';

import { Select, SelectOptionType } from '../../Select';
import { Container, Input } from './Toolbar.styled';

const sortOptions = [
  {
    label: 'Newest',
    value: 0
  },
  {
    label: 'Oldest',
    value: 1
  },
  {
    label: 'With reply',
    value: 2
  },
  {
    label: 'Without reply',
    value: 3
  },
  {
    label: 'Highest rating',
    value: 4
  },
  {
    label: 'Lowest rating',
    value: 5
  }
] as const;

type ToolbarProps = {
  // TODO: make required when search will be available to user
  onSearch?: (value: string) => void;
  searchPlaceholder?: string;

  onSort: (option: Nullable<SelectOptionType>) => void;
  isLoading: boolean;
  sortValue?: ReviewsSortOrderUnion;
  extraLeft?: React.ReactElement;
};

const Toolbar: React.FC<ToolbarProps> = ({
  searchPlaceholder,
  onSearch = () => {},
  onSort,
  sortValue = 0,
  isLoading,
  extraLeft
}) => {
  const [searchValue, setSearchValue] = React.useState('');

  const sortOption = sortOptions.find(opt => opt.value === sortValue);

  const debouncedSearch = React.useCallback(_debounce(onSearch, 1000), []);

  const debouncedSort = React.useCallback(_debounce(onSort, 300), []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    debouncedSearch(value);
  };

  const handleSort = (option: Nullable<SelectOptionType>) => {
    if (sortValue !== option?.value) {
      debouncedSort(option);
    }
  };

  return (
    <Container>
      {extraLeft}

      {searchPlaceholder && onSearch ? (
        <Input
          placeholder={searchPlaceholder}
          rightIcon={<SearchIcon />}
          value={searchValue}
          onChange={handleSearch}
          disabled={isLoading}
        />
      ) : null}

      <Select
        className='reviews-toolbar__select-sort'
        minWidth={18}
        options={sortOptions}
        value={sortOption}
        onChange={option => handleSort(option)}
        isDisabled={isLoading}
      />
    </Container>
  );
};

export default Toolbar;
