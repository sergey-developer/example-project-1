import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { MultiSelectSearchOption } from 'components/Select/MultiSelectSearch';
import {
  EditProviderStatusEnum,
  ProfileAffiliationModel,
  ProfileAwardModel,
  ProfileEducationModel
} from 'features/provider/types/models/EditProviderProfile';
import { directorySimpleLanguagesSelector } from 'state/ducks/directory';
import { insurancesWithSubdivisionsStateSelector } from 'state/ducks/insuranceWithSubdivisions';
import {
  ChangeValidateFieldPayload,
  CreateProfileServicesPayload,
  DeleteProfileServicePayload,
  UpdateProfileServicePayload,
  avatarUpdateRequest,
  changeProfileField,
  changeValidateField,
  coverImageUpdateRequest,
  createProfileServices,
  deleteProfileService,
  getProviderProfileRequest,
  providerCoverLoadSelector,
  providerEditProfileStateSelector,
  publicProviderErrorSelector,
  updateProfileService
} from 'state/ducks/providerEditProfile';
import { ChangeSelectInsurancesPayload } from 'state/ducks/providerProfile/actionTypes';
import { specialtiesWithTaxonomySelector } from 'state/ducks/specialtyWithTaxonomy';
import { useAppDispatch } from 'state/store';

import { ProfilePage } from './ProfilePage';

interface ProfilePageContainerProps extends RouteComponentProps<{ id: string }> {}

const ProfilePageContainer: React.FC<ProfilePageContainerProps> = ({ match }) => {
  const dispatch = useAppDispatch();

  const profile = useSelector(providerEditProfileStateSelector);

  const isProfileWatPublish =
    profile?.data?.providerStatus === EditProviderStatusEnum.UpdateInProgress;
  const insurances = useSelector(insurancesWithSubdivisionsStateSelector);
  const specialtiesOption = useSelector(specialtiesWithTaxonomySelector);
  const languagesList = useSelector(directorySimpleLanguagesSelector);
  const coverIsLoading = useSelector(providerCoverLoadSelector) === 'pending';
  const publishError = useSelector(publicProviderErrorSelector);

  const langOptions = useMemo(
    () =>
      languagesList.map(lang => ({
        label: lang.text,
        value: lang.id,
        id: lang.id
      })),
    [languagesList]
  );
  const providerId = match.params.id;

  useEffect(() => {
    if (providerId) {
      dispatch(
        getProviderProfileRequest({
          providerId
        })
      );
    }
  }, [providerId]);

  const handleAvatarDelete = () => {
    dispatch(
      changeProfileField({
        photoUrl: ''
      })
    );
  };

  const handleCoverDelete = () => {
    dispatch(
      changeProfileField({
        coverImageUrl: ''
      })
    );
  };

  const handleImageChange = async (file: Blob) => {
    if (file) {
      dispatch(
        avatarUpdateRequest({
          file
        })
      );
    }
  };

  const handleCoverChange = (file: Blob) => {
    dispatch(
      coverImageUpdateRequest({
        file
      })
    );
  };

  const handleChangeTextField = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const name = e?.target?.name;
    const value = e?.target?.value;

    dispatch(
      changeProfileField({
        [name]: value
      })
    );
  };

  const handleChangeProfileType = (type: boolean) => {
    dispatch(
      changeProfileField({
        isIndividual: type
      })
    );
  };

  const handleLangChange = (values: MultiSelectSearchOption[]) => {
    dispatch(
      changeProfileField({
        languages: values.map(item => item.value) as string[]
      })
    );
  };

  const handleChangeSelectSpecialities = (payload: number[]) => {
    dispatch(
      changeProfileField({
        specialtyIds: payload
      })
    );
  };

  const handleChangeSelectInsurances = (payload: ChangeSelectInsurancesPayload) => {
    dispatch(
      changeProfileField({
        healthcare: {
          insurances: payload.insurances.map(({ insuranceId, subdivisionId }) => ({
            insuranceId,
            subdivisionId
          })),
          treatment: '',
          condition: ''
        }
      })
    );
  };

  const handleEducationChange = (education: ProfileEducationModel[]) => {
    dispatch(
      changeProfileField({
        education
      })
    );
  };

  const handleAwardChange = (awards: ProfileAwardModel[]) => {
    dispatch(
      changeProfileField({
        awards
      })
    );
  };

  const handleAffiliateChange = (affiliations: ProfileAffiliationModel[]) => {
    dispatch(
      changeProfileField({
        affiliations
      })
    );
  };

  const handleServiceCreate = (payload: CreateProfileServicesPayload) => {
    dispatch(createProfileServices(payload));
  };

  const handleServiceUpdate = (payload: UpdateProfileServicePayload) => {
    dispatch(updateProfileService(payload));
  };

  const handleServiceDelete = (payload: DeleteProfileServicePayload) => {
    dispatch(deleteProfileService(payload));
  };

  const handleChangeValidateField = (payload: ChangeValidateFieldPayload) => {
    dispatch(changeValidateField(payload));
  };

  return (
    <ProfilePage
      state={profile?.data}
      langOptions={langOptions}
      avatarLoading={profile?.avatarLoading === 'pending'}
      insurancesOptions={insurances?.date}
      isProfileWatPublish={isProfileWatPublish}
      specialtiesOption={specialtiesOption?.data}
      coverIsLoading={coverIsLoading}
      publishError={publishError}
      onTextFieldChange={handleChangeTextField}
      onImageChange={handleImageChange}
      onAvatarDelete={handleAvatarDelete}
      onChangeProfileType={handleChangeProfileType}
      onLangChange={handleLangChange}
      //Service
      onServiceChange={handleServiceUpdate}
      onServiceDelete={handleServiceDelete}
      onServiceCreate={handleServiceCreate}
      //Award
      onAwardChange={handleAwardChange}
      //Education
      onEducationsChange={handleEducationChange}
      //Affiliate
      onAffiliateChange={handleAffiliateChange}
      //Insurances
      onChangeSelectInsurances={handleChangeSelectInsurances}
      onChangeSelectSpecialities={handleChangeSelectSpecialities}
      onCoverChange={handleCoverChange}
      onCoverDelete={handleCoverDelete}
      //PublicValidationFieldChange
      onChangeValidateField={handleChangeValidateField}
    />
  );
};

export default ProfilePageContainer;
