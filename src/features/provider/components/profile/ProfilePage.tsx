import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useToggle from 'react-use/lib/useToggle';

import { Delimiter } from 'components/Delimiter';
import {
  TextAreaTranslation,
  TextInput,
  TextInputTranslation
} from 'components/Inputs';
import { RadioBtnEdit } from 'components/Radio';
import {
  InsuranceSelect,
  MultiSelectSearch,
  SpecialtiesSelect
} from 'components/Select';
import { MultiSelectSearchOption } from 'components/Select/MultiSelectSearch';
import { Typography } from 'components/Typography';
import { HEALTHCARE_CATEGORY_ID } from 'config/common';
import {
  ProfileAffiliationModel,
  ProfileAwardModel,
  ProfileEditProviderModel,
  ProfileEducationModel
} from 'features/provider/types/models/EditProviderProfile';
import { Nullable } from 'shared/types';
import { InsuranceWithSubdivision } from 'shared/types/model/insurance/InsuranceWithSubdivisions';
import { SpecialtyWithTaxonomyRecord } from 'shared/types/model/specialty/SpecialtyWithTaxonomyRecord';
import {
  ChangeValidateFieldPayload,
  CreateProfileServicesPayload,
  DeleteProfileServicePayload,
  UpdateProfileServicePayload
} from 'state/ducks/providerEditProfile';
import { PublishProfileErrors } from 'state/ducks/providerEditProfile/providerValisation';
import { ChangeSelectInsurancesPayload } from 'state/ducks/providerProfile/actionTypes';

import { useInModerationModal } from '../common/modals';
import {
  AffiliatesItems,
  AwardsItems,
  EducationItems,
  ServicesItems
} from './components/AdditionalInfoItems';
import {
  CellCategoryInput,
  CellInputName,
  CellLabel,
  CellMaxWidth,
  Container,
  LabelText,
  ProfileCoverStyle,
  ProfileEditButton,
  Row,
  SectionTitle
} from './ProfilePage.styled';

interface ProfilePageProps {
  onTextFieldChange: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onImageChange: (e: Blob) => void;
  onAvatarDelete: () => void;
  onCoverChange: (file: Blob) => void;
  onCoverDelete: () => void;
  state: Nullable<ProfileEditProviderModel>;
  langOptions: MultiSelectSearchOption[];
  insurancesOptions: InsuranceWithSubdivision[];
  specialtiesOption: SpecialtyWithTaxonomyRecord[];
  avatarLoading?: boolean;
  isProfileWatPublish: boolean;
  coverIsLoading: boolean;
  publishError: Nullable<PublishProfileErrors>;
  onChangeProfileType: (type: boolean) => void;
  onLangChange: (values: MultiSelectSearchOption[]) => void;
  //Service
  onServiceChange: (payload: UpdateProfileServicePayload) => void;
  onServiceDelete: (payload: DeleteProfileServicePayload) => void;
  onServiceCreate: (payload: CreateProfileServicesPayload) => void;
  //Award
  onAwardChange: (items: ProfileAwardModel[]) => void;
  //Education
  onEducationsChange: (items: ProfileEducationModel[]) => void;
  //Affiliate
  onAffiliateChange: (items: ProfileAffiliationModel[]) => void;
  //Insurances
  onChangeSelectInsurances: (payload: ChangeSelectInsurancesPayload) => void;
  //Specialities Actions
  onChangeSelectSpecialities: (payload: number[]) => void;
  //PublicValidationFieldChange
  onChangeValidateField: (payload: ChangeValidateFieldPayload) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  state,
  insurancesOptions,
  specialtiesOption,
  langOptions,
  avatarLoading,
  isProfileWatPublish,
  coverIsLoading,
  publishError,
  onTextFieldChange = () => {},
  onImageChange = () => {},
  onAvatarDelete = () => {},
  onCoverChange = () => {},
  onCoverDelete = () => {},
  onChangeProfileType = () => {},
  onLangChange = () => {},
  //Service
  onServiceChange = () => {},
  onServiceDelete = () => {},
  onServiceCreate = () => {},
  //Award
  onAwardChange = () => {},
  //Education
  onEducationsChange = () => {},
  //Affiliate
  onAffiliateChange = () => {},
  //Insurances
  onChangeSelectInsurances = () => {},
  //Specialities Actions
  onChangeSelectSpecialities = () => {},
  onChangeValidateField = () => {}
}) => {
  const [t] = useTranslation(['provider-profile', 'common']);
  const { openOnModerationModal } = useInModerationModal();

  const [isEditMode, toggleMode] = useToggle(false);
  const switchToEditMode = () =>
    isProfileWatPublish ? openOnModerationModal() : toggleMode(true);
  const handleToggleMode = () =>
    isProfileWatPublish ? openOnModerationModal() : toggleMode();
  useEffect(() => {
    if (isProfileWatPublish) {
      toggleMode(false);
    }
  }, [isProfileWatPublish]);

  useEffect(() => {
    if (publishError) {
      toggleMode(true);
    }
  }, [publishError]);

  const profile = state?.profile;

  const profileName = profile?.name || '';
  const category = profile?.category?.text || '';
  const categoryId = profile?.category?.id;

  const langs = profile?.languages || [];

  const langsLabels =
    langs.map(lang => ({
      value: lang
    })) || [];

  const specialtiesSelect = state?.profile?.specialtyIds || [];

  const overview = profile?.overview || '';

  const services = state?.services || [];

  const educations = profile?.education || [];

  const awards = profile?.awards || [];

  const affiliates = profile?.affiliations || [];

  const healthcare = profile?.healthcare;

  const isHealthcare = categoryId === HEALTHCARE_CATEGORY_ID;

  const insurances = healthcare?.insurances || [];

  const avatarUrl = profile?.photoUrl || null;

  const profileType = profile?.isIndividual;
  const coverImageUrl = profile?.coverImageUrl;

  return (
    <Container id='nameLabel'>
      <Typography variant='h2' tag='h2' children={t('pageTitle')} marginButton={3} />

      <ProfileEditButton
        variant={isEditMode ? 'primary' : 'default'}
        onClick={handleToggleMode}
      >
        {t(isEditMode ? 'finishEditBthLabel' : 'editBtnLabel')}
      </ProfileEditButton>

      <ProfileCoverStyle
        onCoverDelete={() =>
          isProfileWatPublish ? openOnModerationModal : onCoverDelete()
        }
        onAvatarChange={file =>
          isProfileWatPublish ? openOnModerationModal() : onImageChange(file)
        }
        onAvatarDelete={() =>
          isProfileWatPublish ? openOnModerationModal() : onAvatarDelete()
        }
        avatarFieldName='photoUrl'
        avatarUrl={avatarUrl}
        avatarLoading={avatarLoading}
        coverIsLoading={coverIsLoading}
        isSelfEmployed={!!profileType}
        onCoverChange={file =>
          isProfileWatPublish ? openOnModerationModal() : onCoverChange(file)
        }
        coverImageUrl={coverImageUrl}
      />

      <Row>
        <CellLabel>
          <LabelText>{t('name')}</LabelText>
        </CellLabel>
        <CellInputName>
          <TextInputTranslation
            name='name'
            edit={isEditMode}
            value={profileName}
            onDoubleClick={switchToEditMode}
            onChange={e => {
              onChangeValidateField({
                field: 'name'
              });
              onTextFieldChange(e);
            }}
            errorMessage={publishError?.name?.message}
          />
        </CellInputName>
      </Row>

      <Row>
        <CellLabel $center>
          <LabelText>{t('categoryLabel')}</LabelText>
        </CellLabel>
        <CellCategoryInput>
          <TextInput edit={isEditMode} disabled value={category} />
        </CellCategoryInput>
      </Row>

      <Row>
        <CellLabel $center>
          <LabelText>{t('profileTypeLabel')}</LabelText>
        </CellLabel>
        <CellMaxWidth>
          <RadioBtnEdit
            edit={isEditMode}
            labels={[
              t('profileTypeLabels.organizationLabel'),
              t('profileTypeLabels.selfEmployedLabel')
            ]}
            value={!!profileType}
            onChange={onChangeProfileType}
          />
        </CellMaxWidth>
      </Row>

      <Row>
        <CellLabel $center>
          <LabelText>{t('languagesInput.label')}</LabelText>
        </CellLabel>
        <CellMaxWidth>
          <MultiSelectSearch
            placeholder={t('languagesInput.placeholder')}
            options={langOptions}
            values={langsLabels}
            onChange={onLangChange}
            readonly={!isEditMode}
            hasBorder={isEditMode}
            onDoubleClick={switchToEditMode}
          />
        </CellMaxWidth>
      </Row>

      <Row>
        <CellLabel $center>
          <LabelText>{t('specialitiesInput.label')}</LabelText>
        </CellLabel>
        <CellMaxWidth>
          <SpecialtiesSelect
            placeholder={t('specialitiesInput.placeholder')}
            options={specialtiesOption}
            selectedValues={specialtiesSelect}
            onChange={onChangeSelectSpecialities}
            readonly={!isEditMode}
            hasBorder={isEditMode}
            onDoubleClick={switchToEditMode}
          />
        </CellMaxWidth>
      </Row>

      <Delimiter marginBottom={3} id='overviewLabel' />

      {isHealthcare && (
        <>
          <SectionTitle marginButton={1}>{t('detailsSectionTitle')}</SectionTitle>

          <Row>
            <CellLabel $center>
              <LabelText>{t('insuranceInput.label')}</LabelText>
            </CellLabel>
            <CellMaxWidth>
              <InsuranceSelect
                options={insurancesOptions}
                placeholder={t('insuranceInput.placeholder')}
                selectedInsurances={insurances}
                onChange={onChangeSelectInsurances}
                readonly={!isEditMode}
                hasBorder={isEditMode}
                onDoubleClick={switchToEditMode}
              />
            </CellMaxWidth>
          </Row>

          {/* <Row>
            <CellLabel $center>
              <LabelText>{t('treatmentLabel')}</LabelText>
            </CellLabel>
            <CellMaxWidth>
              <MultiSelect />
            </CellMaxWidth>
          </Row>

          <Row>
            <CellLabel $center>
              <LabelText>{t('conditionLabel')}</LabelText>
            </CellLabel>
            <CellMaxWidth>
              <MultiSelect />
            </CellMaxWidth>
          </Row> */}

          <Delimiter marginBottom={5.7} marginTop={3} />
        </>
      )}

      <Row>
        <CellLabel>
          <LabelText>{t('overviewTextArea.label')}</LabelText>
        </CellLabel>
        <CellMaxWidth>
          <TextAreaTranslation
            value={overview}
            name='overview'
            placeholder={t('overviewTextArea.placeholder')}
            onChange={e => {
              onChangeValidateField({
                field: 'overview'
              });
              onTextFieldChange(e);
            }}
            onDoubleClick={switchToEditMode}
            edit={isEditMode}
            errorMessage={publishError?.overview?.message}
          />
        </CellMaxWidth>
      </Row>

      <Delimiter id='serviceLabel' marginBottom={3} marginTop={3} />

      <SectionTitle marginButton={1}>{t('additionalInfoSectionLabel')}</SectionTitle>

      <Row>
        <CellLabel>
          <LabelText>{t('servicesLabel')}</LabelText>
        </CellLabel>
        <CellMaxWidth>
          <ServicesItems
            servicesErrors={publishError?.services}
            services={services}
            edit={isEditMode}
            onChangeValidateField={onChangeValidateField}
            onServiceCreate={onServiceCreate}
            onServiceChange={onServiceChange}
            onServiceDelete={onServiceDelete}
          />
        </CellMaxWidth>
      </Row>

      <Delimiter id='educationLabel' marginBottom={3} marginTop={3.5} />

      <Row>
        <CellLabel>
          <LabelText>{t('educationLabel')}</LabelText>
        </CellLabel>
        <CellMaxWidth>
          <EducationItems
            onChangeValidateField={onChangeValidateField}
            educationsErrors={publishError?.educationa}
            educations={educations}
            edit={isEditMode}
            onChange={onEducationsChange}
          />
        </CellMaxWidth>
      </Row>

      <Delimiter id='awardsLabel' marginBottom={3} marginTop={3.5} />

      <Row>
        <CellLabel>
          <LabelText>{t('awardsLabel')}</LabelText>
        </CellLabel>
        <CellMaxWidth>
          <AwardsItems
            onChangeValidateField={onChangeValidateField}
            awardsErrors={publishError?.awards}
            awards={awards}
            edit={isEditMode}
            onAwardChange={onAwardChange}
          />
        </CellMaxWidth>
      </Row>

      <Row>
        <CellLabel>
          <LabelText id='affiliatesLabel'>{t('affiliatesLabel')}</LabelText>
        </CellLabel>
        <CellMaxWidth>
          <AffiliatesItems
            onChangeValidateField={onChangeValidateField}
            affiliatesErrors={publishError?.affiliates}
            affiliates={affiliates}
            edit={isEditMode}
            onAffiliateChange={onAffiliateChange}
          />
        </CellMaxWidth>
      </Row>
    </Container>
  );
};

export default ProfilePage;
