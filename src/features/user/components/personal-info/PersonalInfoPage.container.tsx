import React from 'react';
import { useSelector } from 'react-redux';
import useToggle from 'react-use/lib/useToggle';

// import { useInsurancesWithSubdivisionsSlice } from 'shared/hooks';
import {
  getInsurancesByCategoryIdRequest,
  insurancesWithSubdivisionsStateSelector
} from 'state/ducks/insuranceWithSubdivisions';
import { ChangeSelectInsurancesPayload } from 'state/ducks/providerProfile';
import {
  deleteAvatar,
  editUserPersonalInfo,
  uploadAvatar,
  userPersonalInfoAvatarLoadingSelector,
  userPersonalInfoStateSelector
} from 'state/ducks/userPersonalInfo';
import { useAppDispatch } from 'state/store';

// import { useUserPersonalInfoSlice } from '../../hooks';
import { EditUserPersonalInfoModel } from '../../types';
import PersonalInfoPage from './PersonalInfoPage';

const healthcareCategoryId = 1;

const PersonalInfoPageContainer: React.FC = () => {
  // useUserPersonalInfoSlice();
  // useInsurancesWithSubdivisionsSlice();

  const dispatch = useAppDispatch();
  const personalInfoState = useSelector(userPersonalInfoStateSelector);
  const avatarLoading = useSelector(userPersonalInfoAvatarLoadingSelector);
  const insurancesState = useSelector(insurancesWithSubdivisionsStateSelector);

  const [isEditMode, toggleEditMode] = useToggle(false);

  React.useEffect(() => {
    dispatch(getInsurancesByCategoryIdRequest({ categoryId: healthcareCategoryId }));
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name as keyof EditUserPersonalInfoModel;
    const value = event.target.value;

    dispatch(editUserPersonalInfo({ [name]: value }));
  };

  const handleChangeDate = (value: Date) => {
    dispatch(editUserPersonalInfo({ dateOfBirth: value.toJSON() }));
  };

  const handleChangeInsurances = ({ insurances }: ChangeSelectInsurancesPayload) => {
    const mappedInsurances = insurances.map(insurance => ({
      insuranceId: insurance.insuranceId,
      subdivisionId: insurance.subdivisionId
    }));

    dispatch(editUserPersonalInfo({ insurances: mappedInsurances }));
  };

  const handleSelectPlace = (place: any) => {
    if (!place || !place.formatted_address) return;

    const updates = {
      country: place.formatted_address,
      zipCode: null
    };

    const addressWithZipCode =
      place?.address_components.find((component: any) =>
        component.types.some((type: any) => type === 'postal_code')
      ) || null;

    if (addressWithZipCode) {
      updates.zipCode = addressWithZipCode.long_name;
    }

    dispatch(editUserPersonalInfo(updates));
  };

  const handleUploadAvatar = async (file: Blob) => {
    if (file) {
      dispatch(uploadAvatar(file));
    }
  };

  const handleDeleteAvatar = async () => {
    if (personalInfoState.data?.avatarUrl) {
      dispatch(deleteAvatar(personalInfoState.data.avatarUrl));
    }
  };

  return (
    <PersonalInfoPage
      isEditMode={isEditMode}
      toggleEditMode={toggleEditMode}
      personalInfo={personalInfoState.data}
      personalInfoLoading={personalInfoState.loading}
      avatarLoading={avatarLoading}
      insurances={insurancesState.date}
      insurancesLoading={insurancesState.loading}
      handleChange={handleChange}
      handleChangeDate={handleChangeDate}
      handleChangeInsurances={handleChangeInsurances}
      handleSelectPlace={handleSelectPlace}
      handleUploadAvatar={handleUploadAvatar}
      handleDeleteAvatar={handleDeleteAvatar}
    />
  );
};

export default PersonalInfoPageContainer;
