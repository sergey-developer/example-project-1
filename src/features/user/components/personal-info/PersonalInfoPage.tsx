import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from 'components/Buttons';
import { DatePicker } from 'components/DatePicker';
import { Delimiter } from 'components/Delimiter';
import { GoogleAutocompleteInput, TextInput } from 'components/Inputs';
import { PageWrapper } from 'components/PageWrapper';
import { InsuranceSelect } from 'components/Select';
import { Spinner } from 'components/Spinner';
import { Typography } from 'components/Typography';
import { LoadingStatus } from 'shared/types';
import { SelectedInsuranceModel } from 'shared/types/model/insurance';
import { InsurancesWithSubdivisionsState } from 'state/ducks/insuranceWithSubdivisions';
import { ChangeSelectInsurancesPayload } from 'state/ducks/providerProfile';
import { UserPersonalInfoState } from 'state/ducks/userPersonalInfo';

import {
  Avatar,
  Container,
  ContentContainer,
  InfoLabel,
  InfoValue,
  Row
} from './PersonalInfoPage.styled';

type PersonalInfoPageProps = {
  isEditMode: boolean;
  avatarLoading: LoadingStatus;
  personalInfoLoading: LoadingStatus;
  insurancesLoading: LoadingStatus;
  toggleEditMode: (value?: boolean) => void;
  insurances: InsurancesWithSubdivisionsState['date'];
  personalInfo: UserPersonalInfoState['data'];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeDate: (date: Date) => void;
  handleUploadAvatar: (event: Blob) => Promise<void>;
  handleDeleteAvatar: () => Promise<void>;
  handleChangeInsurances: (data: ChangeSelectInsurancesPayload) => void;
  handleSelectPlace: (place: any) => void;
};

const PersonalInfoPage: React.FC<PersonalInfoPageProps> = ({
  isEditMode,
  toggleEditMode,
  insurances,
  personalInfo,
  avatarLoading,
  personalInfoLoading,
  insurancesLoading,
  handleChange,
  handleChangeDate,
  handleUploadAvatar,
  handleDeleteAvatar,
  handleChangeInsurances,
  handleSelectPlace
}) => {
  const { t, i18n } = useTranslation('user-personal-info');

  const switchToEditMode = () => toggleEditMode(true);

  const selectedInsurances: SelectedInsuranceModel[] =
    personalInfo && !!insurances.length
      ? personalInfo.insurances.map(pIns => {
          const foundInsurance = insurances.find(
            ins => ins.insurance.id === pIns.insuranceId
          );

          if (foundInsurance) {
            const foundSubdivision = foundInsurance.insuranceSubdivision.find(
              insSub => insSub.id === pIns.subdivisionId
            );

            if (foundSubdivision) {
              return {
                insuranceId: foundInsurance.insurance.id,
                subdivisionId: foundSubdivision.id,
                insuranceName: foundInsurance.insurance.name,
                subdivisionName: foundSubdivision.name
              };
            }
          }

          return {
            insuranceId: '',
            subdivisionId: '',
            insuranceName: '',
            subdivisionName: ''
          };
        })
      : [];

  if (personalInfoLoading !== 'finished' || insurancesLoading !== 'finished') {
    return <Spinner size='lg' fullwidth />;
  }

  return (
    <PageWrapper
      title={t('pageTitle')}
      button={
        <Button
          onClick={toggleEditMode}
          variant={isEditMode ? 'primary' : 'default'}
        >
          {isEditMode ? t('editBtn.finishEdit') : t('editBtn.default')}
        </Button>
      }
    >
      <Container>
        <Avatar
          name='avatarUrl'
          avatarUrl={personalInfo?.avatarUrl}
          // onChange={handleUploadAvatar}
          onImageChange={handleUploadAvatar}
          onDelete={handleDeleteAvatar}
          isLoading={avatarLoading === 'pending'}
        />

        <ContentContainer>
          <Row $marginBottom={1}>
            <InfoLabel>
              <Typography variant='h6'>{t('fields.fullName.label')}</Typography>
            </InfoLabel>

            <InfoValue>
              <TextInput
                name='fullName'
                edit={isEditMode}
                value={personalInfo?.fullName}
                placeholder={
                  isEditMode ? t('fields.fullName.placeholder') : undefined
                }
                variant='subTitleTwo'
                onDoubleClick={switchToEditMode}
                onChange={handleChange}
              />
            </InfoValue>
          </Row>

          <Row $marginBottom={1}>
            <InfoLabel>
              <Typography variant='h6'>{t('fields.zipCodeOrCity.label')}</Typography>
            </InfoLabel>

            <InfoValue>
              <GoogleAutocompleteInput
                name='zipCode'
                edit={isEditMode}
                placeholder={
                  isEditMode ? t('fields.zipCodeOrCity.placeholder') : undefined
                }
                variant='subTitleTwo'
                onDoubleClick={switchToEditMode}
                value={personalInfo?.country}
                onSelect={handleSelectPlace}
              />
            </InfoValue>
          </Row>

          <Row $marginBottom={1}>
            <InfoLabel>
              <Typography variant='h6'>{t('fields.dateOfBirth.label')}</Typography>
            </InfoLabel>

            <InfoValue>
              <DatePicker
                name='dateOfBirth'
                onDoubleClick={switchToEditMode}
                placeholder={isEditMode ? 'DD/MM/YYYY' : undefined}
                value={personalInfo?.dateOfBirth || null}
                onChange={handleChangeDate}
                readonly={!isEditMode}
                hasBorder={isEditMode}
                locale={i18n.language}
              />
            </InfoValue>
          </Row>

          <Row $marginBottom={1}>
            <InfoLabel>
              <Typography variant='h6'>{t('fields.email.label')}</Typography>
            </InfoLabel>

            <InfoValue>
              <TextInput
                disabled={isEditMode}
                name='email'
                edit={isEditMode}
                value={personalInfo?.email}
                placeholder={isEditMode ? t('fields.email.placeholder') : undefined}
                variant='subTitleTwo'
                onChange={handleChange}
              />
            </InfoValue>
          </Row>

          <Row $marginBottom={3}>
            <InfoLabel>
              <Typography variant='h6'>{t('fields.phoneNumber.label')}</Typography>
            </InfoLabel>

            <InfoValue>
              <TextInput
                type='number'
                name='phone'
                edit={isEditMode}
                value={personalInfo?.phone}
                placeholder={isEditMode ? '+1 ___ ___ __ __' : undefined}
                variant='subTitleTwo'
                onDoubleClick={switchToEditMode}
                onChange={handleChange}
              />
            </InfoValue>
          </Row>

          <Delimiter marginBottom={3} />

          <Row>
            <InfoLabel>
              <Typography variant='h6'>{t('fields.insurance.label')}</Typography>
            </InfoLabel>

            <InfoValue width='68%'>
              <InsuranceSelect
                options={insurances}
                selectedInsurances={selectedInsurances}
                onChange={handleChangeInsurances}
                placeholder={t('fields.insurance.placeholder')}
                readonly={!isEditMode}
                hasBorder={isEditMode}
                onDoubleClick={switchToEditMode}
              />
            </InfoValue>
          </Row>
        </ContentContainer>
      </Container>
    </PageWrapper>
  );
};

export default PersonalInfoPage;
