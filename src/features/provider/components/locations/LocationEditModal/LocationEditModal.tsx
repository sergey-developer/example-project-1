import { Form, Formik } from 'formik';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import useToggle from 'react-use/lib/useToggle';

import { Button } from 'components/Buttons';
import { CheckBox } from 'components/CheckBox';
import { GoogleMap } from 'components/GoogleMap';
import { SocialIcon, StarIcon } from 'components/Icons';
import { GoogleAutocompleteInput, TextInput } from 'components/Inputs';
import { MultiSelectSearchOption } from 'components/Select/MultiSelectSearch';
import { PHONE_INPUT_MASK } from 'config/common';
import { SocialNamesType } from 'features/provider/constants';
import { makeLocationAddress } from 'features/provider/utils';
import { Nullable, ValueOf } from 'shared/types';
import { ErrorTypes } from 'shared/types/error/error-types';
import { SocialLinkType } from 'shared/types/model/common/SocialLinkType';
import { SystemDayOfWeek } from 'shared/types/model/common/SystemDayOfWeek';
import { normalizeNumber } from 'shared/utils';
import { googleAddressToMap } from 'shared/utils/gooleMapUtils';

import { LangSelectWithLabel } from './components/LangSelectWithLabel';
import {
  Actions,
  AddressUseBtn,
  Column,
  ColumnLabel,
  ContactColumn,
  Container,
  DayWithTimeStyle,
  Head,
  InputLabel,
  MapSwitchLabel,
  Row,
  SocialColumn,
  SocialInput,
  Title,
  WorkingHoursColumn
} from './LocationEditModal.styled';
import { locationValidation } from './locationValidation';

interface LocationEditModalProps {
  open?: boolean;
  langOptions: MultiSelectSearchOption[];
  providerRegionId?: Nullable<string>;
  onClose?: () => void;
  onSubmit?: (locationId: string, values: LocationEditInitialValues) => void;
  initialValues?: LocationEditInitialValues;
  locationId: string;
  onSetMainLocation: () => void;
}

const socialInputs: {
  name: SocialNamesType;
  // type: SocialLinkType;
  translationKey: string;
}[] = [
  {
    name: 'facebook',
    translationKey: 'facebookField'
  },
  {
    name: 'instagram',
    translationKey: 'facebookField'
  },
  {
    name: 'twitter',
    translationKey: 'twitterField'
  },
  {
    name: 'linkedIn',
    translationKey: 'linkedInField'
  },
  {
    name: 'whatsapp',
    translationKey: 'whatsAppField'
  },
  {
    name: 'reddit',
    translationKey: 'redditField'
  }
];

export const workDaysItems = [
  SystemDayOfWeek.Monday,
  SystemDayOfWeek.Tuesday,
  SystemDayOfWeek.Wednesday,
  SystemDayOfWeek.Thursday,
  SystemDayOfWeek.Friday,
  SystemDayOfWeek.Saturday,
  SystemDayOfWeek.Sunday
];

export const defaultWorkingDay: DayType = {
  checked: false,
  from: 9 * 60 * 60,
  to: 18 * 60 * 60
};

type DayType = {
  checked: boolean;
  from: number;
  to: number;
};

export const initialValueLocationEdit: LocationEditInitialValues = {
  title: '',
  address: {
    address1: '',
    address2: '',
    city: '',
    zipCode: '',
    zipCodeFull: '',
    country: '',
    state: ''
  },
  geoPoint: {
    lat: undefined,
    lng: undefined
  },
  acceptingNewPatients: undefined,
  languages: [],
  phone: '',
  fax: '',
  workingHours: {
    [SystemDayOfWeek.Monday]: defaultWorkingDay,
    [SystemDayOfWeek.Tuesday]: defaultWorkingDay,
    [SystemDayOfWeek.Wednesday]: defaultWorkingDay,
    [SystemDayOfWeek.Thursday]: defaultWorkingDay,
    [SystemDayOfWeek.Friday]: defaultWorkingDay,
    [SystemDayOfWeek.Saturday]: defaultWorkingDay,
    [SystemDayOfWeek.Sunday]: defaultWorkingDay
  },
  socialLinks: {
    facebook: '',
    twitter: '',
    instagram: '',
    email: '',
    website: '',
    reddit: '',
    whatsapp: '',
    linkedIn: ''
  }
};

export type LocationEditInitialValues = {
  title: Nullable<string>;
  address: {
    address1: Nullable<string>;
    address2: Nullable<string>;
    city: Nullable<string>;
    zipCode: Nullable<string>;
    zipCodeFull: Nullable<string>;
    country: Nullable<string>;
    state: Nullable<string>;
  };
  geoPoint: {
    lat?: number;
    lng?: number;
  };
  acceptingNewPatients?: boolean;
  languages: string[];
  phone: Nullable<string>;
  fax: Nullable<string>;
  workingHours: {
    [SystemDayOfWeek.Monday]?: DayType;
    [SystemDayOfWeek.Tuesday]?: DayType;
    [SystemDayOfWeek.Wednesday]?: DayType;
    [SystemDayOfWeek.Thursday]?: DayType;
    [SystemDayOfWeek.Friday]?: DayType;
    [SystemDayOfWeek.Saturday]?: DayType;
    [SystemDayOfWeek.Sunday]?: DayType;
  };

  socialLinks: {
    facebook: Nullable<string>;
    twitter: Nullable<string>;
    instagram: Nullable<string>;
    email: Nullable<string>;
    website: Nullable<string>;
    reddit: Nullable<string>;
    whatsapp: Nullable<string>;
    linkedIn: Nullable<string>;
  };
};

const LocationEditModal: React.FC<LocationEditModalProps> = ({
  onClose = () => {},
  open,
  initialValues,
  onSubmit = () => {},
  locationId,
  onSetMainLocation = () => {},
  langOptions,
  providerRegionId
}) => {
  const [translation] = useTranslation(['modals', 'common', 'errors']);
  const [mapOpen, toggleMap] = useToggle(false);

  const t = (key: string, options?: any) =>
    translation(`changeLocationModal.${key}`, options);
  const dayOfWeek = useMemo(
    () => translation('common:dayOfWeek', { returnObjects: true }) as string[],
    []
  );

  const handleSubmit = (values: LocationEditInitialValues) => {
    onSubmit(locationId, {
      ...values,
      phone: String(normalizeNumber(values.phone || ''))
    });
  };

  return (
    <Container open={!!open} onClose={onClose}>
      <Formik
        initialValues={initialValues || initialValueLocationEdit}
        onSubmit={handleSubmit}
        enableReinitialize
        validationSchema={locationValidation(translation)}
      >
        {({
          values,
          handleChange,
          handleBlur,
          setFieldValue,
          handleSubmit,
          setErrors,
          errors,
          isValid,
          touched
        }) => {
          return (
            <Form>
              <Head>
                <Title variant='h2Two'>{t('title')}</Title>
                <AddressUseBtn
                  icon={<StarIcon />}
                  type='button'
                  onClick={onSetMainLocation}
                >
                  {t('useAddressBtnLabel')}
                </AddressUseBtn>
              </Head>
              <Row $column={2}>
                <Column>
                  <InputLabel htmlFor='titleField'>
                    {t('titleField.label')}
                  </InputLabel>
                  <TextInput
                    size='small'
                    id='titleField'
                    name='title'
                    value={values.title}
                    onChange={handleChange}
                  />
                </Column>
                <Column>
                  <InputLabel htmlFor='addressNote'>
                    {t('addressNote.label')}
                  </InputLabel>
                  <TextInput
                    size='small'
                    value={values?.address?.address2}
                    id='addressNote'
                    onChange={handleChange}
                    name='address.address2'
                  />
                </Column>
              </Row>

              <Row $spaceButton={2}>
                <Column>
                  <InputLabel htmlFor='locationField'>
                    {t('location.label')}
                  </InputLabel>

                  <GoogleAutocompleteInput
                    value={makeLocationAddress(values.address)}
                    errorMessage={errors.address?.address1}
                    autocompleteTypes='address'
                    onSelect={e => {
                      const addressMap = googleAddressToMap(e);

                      const lat = e.geometry?.location?.lat();
                      const lng = e.geometry?.location?.lng();

                      const address1 = `${
                        addressMap.get('street_number')?.short_name || ''
                      } ${addressMap.get('route')?.long_name || ''}`;

                      setFieldValue('address', {
                        address1,
                        city: addressMap.get('locality')?.long_name || '',
                        zipCode: addressMap.get('postal_code')?.short_name || '',
                        zipCodeFull: addressMap.get('postal_code')?.long_name || '',
                        country: addressMap.get('country')?.short_name || '',
                        state:
                          addressMap.get('administrative_area_level_1')
                            ?.short_name || ''
                      });

                      setFieldValue('geoPoint', {
                        lat,
                        lng
                      });

                      if (
                        !addressMap.get('street_number')?.short_name ||
                        !addressMap.get('route')?.long_name
                      ) {
                        setErrors({
                          address: {
                            address1: t(`errors.${ErrorTypes.ADDRESS_NOT_FULL}`)
                          }
                        });
                      }

                      if (
                        providerRegionId !== addressMap.get('country')?.short_name
                      ) {
                        setErrors({
                          address: {
                            address1: t(`errors.changeRegionError`, {
                              region: providerRegionId
                            })
                          }
                        });
                      }
                    }}
                  />
                </Column>
              </Row>

              <Row>
                <Column>
                  <MapSwitchLabel onClick={toggleMap}>
                    {t(mapOpen ? 'hideMapLabel' : 'viewInMapLabel')}
                  </MapSwitchLabel>
                </Column>
              </Row>

              {mapOpen && (
                <Row>
                  <Column>{<GoogleMap markers={[values.geoPoint]} />}</Column>
                </Row>
              )}

              <Row $spaceButton={2}>
                <Column>
                  <CheckBox
                    label={t('acceptingPatientRadio.label')}
                    defaultChecked={values?.acceptingNewPatients}
                    onClick={() => {
                      setFieldValue(
                        'acceptingNewPatients',
                        !values?.acceptingNewPatients
                      );
                    }}
                    name='acceptingNewPatients'
                  />
                </Column>
              </Row>

              <Row>
                <Column>
                  <LangSelectWithLabel
                    options={langOptions}
                    values={
                      values.languages?.map(
                        item =>
                          langOptions.find(
                            option => option.value === item
                          ) as typeof langOptions[0]
                      ) || []
                    }
                    onChange={values => {
                      setFieldValue(
                        'languages',
                        values.map(item => item.value)
                      );
                    }}
                    label={t('langInput.label')}
                    placeholder={t('langInput.placeholder')}
                  />
                </Column>
              </Row>

              <Row $column={[null, 38, null]} $gap={0} $spaceButton={2.4}>
                <ContactColumn>
                  <InputLabel htmlFor='phoneField'>
                    {t('phoneField.label')}
                  </InputLabel>
                  <TextInput
                    size='small'
                    errorMessage={touched?.phone ? errors?.phone : ''}
                    mask={PHONE_INPUT_MASK}
                    onBlur={handleBlur}
                    spaceBottom={1.2}
                    id='phoneField'
                    name='phone'
                    value={values.phone}
                    onChange={handleChange}
                  />

                  <InputLabel htmlFor='faxField'>{t('faxField.label')}</InputLabel>
                  <TextInput
                    size='small'
                    spaceBottom={1.2}
                    id='faxField'
                    name='fax'
                    value={values.fax}
                    onChange={handleChange}
                  />

                  <InputLabel htmlFor='emailField'>
                    {t('emailField.label')}
                  </InputLabel>
                  <TextInput
                    size='small'
                    spaceBottom={1.2}
                    id='emailField'
                    value={values.socialLinks?.email}
                    onChange={handleChange}
                    name='socialLinks.email'
                  />

                  <InputLabel htmlFor='websiteField'>
                    {t('websiteField.label')}
                  </InputLabel>
                  <TextInput
                    size='small'
                    spaceBottom={1.2}
                    id='websiteField'
                    name='socialLinks.website'
                    value={values.socialLinks.website}
                    onChange={handleChange}
                  />
                </ContactColumn>
                <WorkingHoursColumn>
                  <ColumnLabel>{t('workingHoursLabel')}</ColumnLabel>
                  {workDaysItems.map((item, index) => (
                    <DayWithTimeStyle
                      label={dayOfWeek[item]}
                      key={index}
                      onFromChange={value => {
                        setFieldValue(`workingHours.${item}.from`, value);
                      }}
                      onToChange={value =>
                        setFieldValue(`workingHours.${item}.to`, value)
                      }
                      onCheckBoxClick={value => {
                        setFieldValue(`workingHours.${item}.checked`, value);
                      }}
                      {...(values.workingHours[item] || defaultWorkingDay)}
                    />
                  ))}
                </WorkingHoursColumn>
                <SocialColumn>
                  <ColumnLabel>{t('socialLinkLabel')}</ColumnLabel>
                  {socialInputs.map(item => (
                    <SocialInput
                      key={item.name}
                      name={`socialLinks.${item.name}`}
                      value={
                        values.socialLinks[
                          item.name as keyof typeof initialValueLocationEdit['socialLinks']
                        ]
                      }
                      onChange={handleChange}
                      placeholder={t(`${item.translationKey}.placeholder`)}
                      icon={<SocialIcon name={item.name} size='sm' />}
                    />
                  ))}
                </SocialColumn>
              </Row>

              <Actions>
                <Button variant='primary' onClick={handleSubmit} disabled={!isValid}>
                  {t('finishEditBtnLabel')}
                </Button>
                <Button variant='additional' onClick={onClose}>
                  {t('cancelBtnLabel')}
                </Button>
              </Actions>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default LocationEditModal;
