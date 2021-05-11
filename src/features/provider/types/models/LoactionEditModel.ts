import {
  ExampleProjectProvidersDtoEnumsAcceptingNewPatientsStatus,
  ExampleProjectProvidersDtoEnumsSocialLinkType,
  SystemDayOfWeek
} from 'shared/types/generate/provider';

export interface ProfileAddressModel {
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  zipCodeFull?: string | null;
  country?: string | null;
}

export interface ProfileWorkingHoursModel {
  day?: SystemDayOfWeek;
  from?: number;
  to?: number;
}

export interface ProfileGeoCoordinateModel {
  /** @format double */
  lat?: number;

  /** @format double */
  lng?: number;
}

export interface ProfileSocialLinkModel {
  socialType?: ExampleProjectProvidersDtoEnumsSocialLinkType;
  url?: string | null;
}

export interface LocationAttributesModel {
  title?: string | null;
  acceptingNewPatients?: ExampleProjectProvidersDtoEnumsAcceptingNewPatientsStatus;
  languages?: string[] | null;
  address?: ProfileAddressModel;
  geoPoint?: ProfileGeoCoordinateModel;
  workingHours?: ProfileWorkingHoursModel[] | null;
  socialLinks?: ProfileSocialLinkModel[] | null;
  phone?: string | null;
  fax?: string | null;
}

export interface LocationEditModel {
  id?: string | null;
  target?: LocationAttributesModel;
  removed?: boolean;
}
