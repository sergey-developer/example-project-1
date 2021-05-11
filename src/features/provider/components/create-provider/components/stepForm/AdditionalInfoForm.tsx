import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { SpecialtiesSelect } from 'components/Select';
import { NPI_INPUT_MASK, PHONE_INPUT_MASK, SUPPORT_EMAIL } from 'config/common';
import { Nullable } from 'shared/types';
import { ProvidersWithTaxonomyDto } from 'shared/types/generate';
import { normalizeNumber } from 'shared/utils';
import {
  CreateProviderError,
  ExistProviderProfileFull,
  SetSimpleFieldPayload
} from 'state/ducks/createProvider';

import { ExistsProvidersList } from '../ExistsProvidersList';
import {
  ActionW,
  BackButton,
  Container,
  FormTitle,
  InputLabel,
  InputWithLabelStyled,
  NextButton,
  SpecialtiesW,
  SupportContactLabel,
  SupportContactLink
} from './Common.styled';

interface AdditionalInfoFormProps {
  className?: string;
  onChange?: (payload: SetSimpleFieldPayload) => void;
  phone: Nullable<string>;
  email: Nullable<string>;
  npi: Nullable<string>;
  specialtiesOption: ProvidersWithTaxonomyDto[];
  existsProviders: ExistProviderProfileFull[];
  selectSpecialtyIds: number[];
  goNextStep: () => void;
  goBackStep: () => void;
  isNeedNpi: boolean;
  onChangeNPI: (npi: string) => void;
  npiError: Nullable<CreateProviderError>;
  isExistsProviderCheck: boolean;
}

const AdditionalInfoForm: React.FC<AdditionalInfoFormProps> = ({
  onChange = () => {},
  onChangeNPI = () => {},
  phone,
  email,
  npi,
  goNextStep,
  goBackStep,
  specialtiesOption,
  selectSpecialtyIds,
  isNeedNpi,
  existsProviders,
  npiError,
  isExistsProviderCheck
}) => {
  const [translation] = useTranslation('provider-pages');

  const t = (key: string) => translation(`createProviderPage.${key}`);

  const npiErrorMessage = npiError?.type
    ? t(`errors.${npiError.type}`)
    : npiError?.message || '';

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event?.target?.name;
    const value = event?.target?.value;
    if (name === 'phone') {
      onChange({
        [name]: normalizeNumber(value)
      });
    } else {
      onChange({
        [name]: value
      });
    }
  };

  const handleSpecialtiesChange = (specialtyIds: number[]) => {
    onChange({
      specialtyIds
    });
  };

  const handleChangeNpi = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event?.target?.value;
    onChangeNPI(value);
  };

  const isNpiValid = npi?.length === 10;

  const isFormFull =
    !!phone &&
    !!email &&
    !!selectSpecialtyIds.length &&
    !npiErrorMessage &&
    !(isNeedNpi && !isNpiValid) &&
    !isExistsProviderCheck;

  const isOwnerExists = !!existsProviders?.find(item => item.isOwnerExists);

  return (
    <Container>
      <FormTitle spacingBottom={2.4}>{t('providerInfoLabel')}</FormTitle>

      {isNeedNpi && (
        <>
          <InputWithLabelStyled
            onlyMobile
            labelNode={<InputLabel />}
            type='text'
            name='npi'
            value={npi || ''}
            mask={NPI_INPUT_MASK}
            onChange={handleChangeNpi}
            label={t('npiField.label')}
            placeholder={t('npiField.placeholder')}
            error={npiErrorMessage}
          />
          {!!existsProviders.length && (
            <ExistsProvidersList existsProviders={existsProviders} />
          )}
          {isOwnerExists && (
            <SupportContactLabel>
              <Trans
                t={translation}
                values={{
                  email: SUPPORT_EMAIL
                }}
                i18nKey='createProviderPage.ifOverExistsProviderLabel'
                components={[
                  <SupportContactLink href={`mailto:${SUPPORT_EMAIL}`} />
                ]}
              />
            </SupportContactLabel>
          )}
        </>
      )}
      <SpecialtiesW>
        <InputLabel>{t('specialitiesField.label')}</InputLabel>
        <SpecialtiesSelect
          placeholder={t('specialitiesField.placeholder')}
          options={specialtiesOption}
          onChange={handleSpecialtiesChange}
          selectedValues={selectSpecialtyIds}
          hasBorder
        />
      </SpecialtiesW>

      <InputWithLabelStyled
        onlyMobile
        labelNode={<InputLabel />}
        type='text'
        name='phone'
        mask={PHONE_INPUT_MASK}
        value={phone || ''}
        onChange={handleFieldChange}
        label={t('phoneNumberField.label')}
        placeholder={t('phoneNumberField.placeholder')}
      />

      <InputWithLabelStyled
        onlyMobile
        labelNode={<InputLabel />}
        type='text'
        name='email'
        value={email || ''}
        onChange={handleFieldChange}
        label={t('emailField.label')}
        placeholder={t('emailField.placeholder')}
      />

      <ActionW>
        <BackButton onClick={goBackStep}>{t('backBtnLabel')}</BackButton>

        <NextButton
          onClick={() => isFormFull && goNextStep()}
          disabled={!isFormFull}
        >
          {t('nextBtnLabel')}
        </NextButton>
      </ActionW>
    </Container>
  );
};

export default AdditionalInfoForm;
