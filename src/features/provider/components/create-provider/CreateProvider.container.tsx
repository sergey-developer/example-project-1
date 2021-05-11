import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { makeLocationAddress } from 'features/provider/utils';
import { normalizeNumber } from 'shared/utils';
import {
  CreateProviderSteps,
  SetLocationPayload,
  SetSimpleFieldPayload,
  changeNPIRequest,
  changeProviderName,
  createProfileRequest,
  createProviderErrorsSelector,
  createProviderStateSelector,
  createProviderStepSelector,
  goToStep,
  setCategory,
  setDefaultState,
  setLocationRequest,
  setSimpleField,
  similarNameProviderProfilesSelector
} from 'state/ducks/createProvider';
import {
  directoryCategoryListSelector,
  getCategoryListRequest
} from 'state/ducks/directory';
import { specialtiesWithTaxonomySelector } from 'state/ducks/specialtyWithTaxonomy';
import { useAppDispatch } from 'state/store';

import CreateProvider from './CreateProvider';

interface CreateProviderContainerProps {}

const CreateProviderContainer: React.FC<CreateProviderContainerProps> = ({}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategoryListRequest());
  }, []);

  const specialtiesOption = useSelector(specialtiesWithTaxonomySelector);
  const createProviderState = useSelector(createProviderStateSelector);
  const createProviderStep = useSelector(createProviderStepSelector);
  const errors = useSelector(createProviderErrorsSelector);
  const categoriesList = useSelector(directoryCategoryListSelector);

  const addressString = createProviderState?.data?.address
    ? makeLocationAddress(createProviderState?.data?.address)
    : '';

  const selectCategoryId = createProviderState?.data?.categoryId;

  const similarProfiles = useSelector(similarNameProviderProfilesSelector);

  const handleSelectLocation = (payload: SetLocationPayload) => {
    dispatch(setLocationRequest(payload));
  };

  const handleGoMainCategoryStep = () => {
    dispatch(
      goToStep({
        step: CreateProviderSteps.MainCategory
      })
    );
  };

  const handleGoStep = (step: CreateProviderSteps) => {
    dispatch(
      goToStep({
        step
      })
    );
  };

  const handleSetCategory = (categoryId: number) => {
    dispatch(
      setCategory({
        categoryId
      })
    );
  };

  const handleChangeTextField = (payload: SetSimpleFieldPayload) => {
    dispatch(setSimpleField(payload));
  };

  const handleCreateNewProvider = () => {
    dispatch(createProfileRequest());
  };

  const handleResetState = () => {
    dispatch(setDefaultState());
  };

  const handleChangeNPI = (npi: string) => {
    dispatch(
      changeNPIRequest({
        npi: normalizeNumber(npi)
      })
    );
  };

  const handleChangeName = (name: string) => {
    dispatch(
      changeProviderName({
        name
      })
    );
  };

  return (
    <CreateProvider
      step={createProviderStep}
      createState={createProviderState}
      errors={errors}
      addressString={addressString}
      categoriesList={categoriesList}
      selectCategoryId={selectCategoryId}
      similarProfiles={similarProfiles}
      onSetCategory={handleSetCategory}
      onSelectLocation={handleSelectLocation}
      onGoMainCategoryStep={handleGoMainCategoryStep}
      onGoStep={handleGoStep}
      onChangeTextField={handleChangeTextField}
      onCreateNewProvider={handleCreateNewProvider}
      onResetState={handleResetState}
      onChangeNPI={handleChangeNPI}
      onChangeName={handleChangeName}
    />
  );
};

export default CreateProviderContainer;
