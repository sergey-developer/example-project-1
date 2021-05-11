import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { StylesConfig } from 'react-select';

import { LanguageEnum } from 'config/i18n';
import { Nullable } from 'shared/types';
import { directoryStateSelector } from 'state/ducks/directory';
import theme from 'styles/theme';

import { Container } from './LanguageSelect.styled';
import Select, { SelectOptionType } from './Select';

export type LanguageSelectProps = {
  className?: string;
  fullWidth?: boolean;
};

const customStyles: StylesConfig<SelectOptionType, false> = {
  control: base => ({
    ...base,
    minHeight: '3.5rem',
    border: '1px solid transparent',
    backgroundColor: theme.colors.whiteLilacTwo
  }),
  indicatorsContainer: base => ({
    ...base,
    paddingRight: 0
  }),
  placeholder: base => ({
    ...base,
    ...theme.fonts.label
  }),
  singleValue: base => ({
    ...base,
    ...theme.fonts.label,
    color: theme.colors.glacier
  }),
  option: base => ({
    ...base,
    ...theme.fonts.label
  })
};

const supportedLanguagesIds = Object.values(LanguageEnum);

const LanguageSelect: React.FC<LanguageSelectProps> = ({
  className,
  fullWidth = false
}) => {
  const { i18n } = useTranslation();

  const { data, loading } = useSelector(directoryStateSelector);
  const languages = data.simpleLanguages || [];

  const handleChange = (option: Nullable<SelectOptionType>) => {
    if (!option || option.value === i18n.language) return;

    i18n.changeLanguage(option.value);
  };

  const { options, defaultOption } = React.useMemo(() => {
    const options: SelectOptionType[] = [];
    let defaultOption: SelectOptionType = { label: '', value: '' };
    const result = { options, defaultOption };

    if (!languages?.length) return result;

    languages.forEach(lng => {
      if (
        lng.id &&
        lng.text &&
        supportedLanguagesIds.includes(lng.id as LanguageEnum)
      ) {
        const option = {
          label: lng.text,
          value: lng.id
        };

        options.push(option);

        if (lng.id === i18n.language) {
          result.defaultOption = option;
        }
      }
    });

    return result;
  }, [languages]);

  return (
    <Container className={className} fullWidth={fullWidth}>
      <Select
        options={options}
        defaultValue={defaultOption}
        onChange={option => handleChange(option)}
        isLoading={loading !== 'finished'}
        styles={customStyles}
      />
    </Container>
  );
};

export default React.memo(LanguageSelect);
