import React from 'react';
import { useTranslation } from 'react-i18next';

import { PageWrapper } from 'components/PageWrapper';
import { HEALTHCARE_CATEGORY_ID } from 'config/common';
import { Nullable } from 'shared/types';
import {
  ProviderProfileDto,
  ProvidersCategoryRecordDto
} from 'shared/types/generate';
import {
  CreateProviderErrorsMap,
  CreateProviderState,
  CreateProviderSteps,
  SetLocationPayload,
  SetSimpleFieldPayload
} from 'state/ducks/createProvider';

import CreateSuccessScreen from './components/CreateSuccessScreen';
import {
  AdditionalInfoForm,
  AddressForm,
  CategoryForm,
  ProviderTypeForm
} from './components/stepForm';
import { FormWrapper, StepsProgress } from './CreateProvider.styled';

interface CreateProviderProps {
  step: CreateProviderSteps;
  addressString: string;
  categoriesList: ProvidersCategoryRecordDto[];
  similarProfiles: ProviderProfileDto[];
  selectCategoryId: Nullable<number>;
  onSetCategory: (categoryId: number) => void;
  onSelectLocation: (payload: SetLocationPayload) => void;
  onGoMainCategoryStep: () => void;
  onGoStep: (step: CreateProviderSteps) => void;
  onChangeTextField: (payload: SetSimpleFieldPayload) => void;
  onCreateNewProvider: () => void;
  onResetState: () => void;
  onChangeNPI: (npi: string) => void;
  errors: CreateProviderErrorsMap;
  createState: CreateProviderState;
  onChangeName: (name: string) => void;
}

const CreateProvider: React.FC<CreateProviderProps> = ({
  step,
  errors,
  addressString,
  categoriesList,
  similarProfiles,
  onSelectLocation,
  selectCategoryId,
  onSetCategory,
  onGoMainCategoryStep,
  onGoStep,
  onChangeTextField,
  onCreateNewProvider,
  onResetState,
  createState,
  onChangeNPI,
  onChangeName
}) => {
  const [translation] = useTranslation('provider-pages');
  const t = (key: string) => translation(`createProviderPage.${key}`);

  const handleGoStep = (step: CreateProviderSteps) => () => {
    onGoStep(step);
  };

  const handleChangeTextField = (payload: SetSimpleFieldPayload) => {
    onChangeTextField(payload);
  };

  const isIndividual = createState?.data?.isIndividual;
  const providerName = createState?.data?.name;
  const phoneNumber = createState?.data?.phone;
  const email = createState?.data?.email;
  const npiValue = createState?.data?.npi;
  const specialties = createState?.specialtiesDirectory;
  const selectSpecialtyIds = createState?.data?.specialtyIds;
  const newProviderId = createState?.data?.providerId;

  const npiError = createState?.errors?.npi;
  const existsProviders = createState.existProviderProfiles;

  const isExistsProviderCheck = createState?.loaders?.existCheck === 'pending';

  const isNeedNpi =
    createState.data.categoryId === HEALTHCARE_CATEGORY_ID &&
    createState.data.address?.country === 'US';

  if (step === CreateProviderSteps.Success) {
    return (
      <CreateSuccessScreen
        newProviderId={newProviderId}
        onResetState={onResetState}
      />
    );
  }

  return (
    <PageWrapper title={t('title')}>
      <StepsProgress step={step} />
      <FormWrapper>
        {step === CreateProviderSteps.Address && (
          <AddressForm
            onSelectLocation={onSelectLocation}
            error={errors?.address}
            value={addressString}
            onGoNextStep={onGoMainCategoryStep}
          />
        )}

        {step === CreateProviderSteps.MainCategory && (
          <CategoryForm
            categoriesList={categoriesList}
            selectCategoryId={selectCategoryId}
            onSetCategory={onSetCategory}
            goNextStep={handleGoStep(CreateProviderSteps.ProviderName)}
            goBackStep={handleGoStep(CreateProviderSteps.Address)}
          />
        )}
        {step === CreateProviderSteps.ProviderName && (
          <ProviderTypeForm
            onChange={handleChangeTextField}
            onChangeName={onChangeName}
            isIndividual={isIndividual}
            nameValue={providerName}
            similarProfiles={similarProfiles}
            goNextStep={handleGoStep(CreateProviderSteps.AdditionInfo)}
            goBackStep={handleGoStep(CreateProviderSteps.MainCategory)}
          />
        )}
        {step === CreateProviderSteps.AdditionInfo && (
          <AdditionalInfoForm
            onChange={handleChangeTextField}
            isExistsProviderCheck={isExistsProviderCheck}
            phone={phoneNumber}
            email={email}
            npi={npiValue}
            onChangeNPI={onChangeNPI}
            isNeedNpi={isNeedNpi}
            npiError={npiError}
            existsProviders={existsProviders}
            specialtiesOption={specialties}
            selectSpecialtyIds={selectSpecialtyIds}
            goNextStep={onCreateNewProvider}
            goBackStep={handleGoStep(CreateProviderSteps.ProviderName)}
          />
        )}
      </FormWrapper>
    </PageWrapper>
  );
};

export default CreateProvider;
