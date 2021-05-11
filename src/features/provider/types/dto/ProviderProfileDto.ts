import { Nullable } from 'shared/types';

type Gender = 0 | 1 | 2;
type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;
type VehicleType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type SocialLinkType = 0 | 1 | 2 | 3 | 4 | 5;
type ProviderProfileStatus = 1 | 2 | 3 | 4;
type AcceptingNewPatientsStatus = 0 | 1 | 2;

type SocialLinkDto = {
  socialType: SocialLinkType;
  url: Nullable<string>;
};

type EducationDto = {
  degree: Nullable<string>;
  schoolName: Nullable<string>;
  graduated: number;
  photoUrl: Nullable<string>;
};

type AwardDto = {
  name: Nullable<string>;
  year: number;
  photoUrl: Nullable<string>;
};

type AffiliationDto = {
  name: Nullable<string>;
  webSite: Nullable<string>;
};

type ServiceDto = {
  name: Nullable<string>;
  description: Nullable<string>;
  imageUrl: Nullable<string>;
};

type TimeSpan = {
  readonly ticks: number;
  readonly days: number;
  readonly hours: number;
  readonly milliseconds: number;
  readonly minutes: number;
  readonly seconds: number;
  readonly totalDays: number;
  readonly totalHours: number;
  readonly totalMilliseconds: number;
  readonly totalMinutes: number;
  readonly totalSeconds: number;
};

type AddressDto = {
  address1: Nullable<string>;
  address2: Nullable<string>;
  city: Nullable<string>;
  state: Nullable<string>;
  zipCode: Nullable<string>;
  zipCodeFull: Nullable<string>;
  country: Nullable<string>;
};

type WorkingHoursDto = {
  day: DayOfWeek;
  from: TimeSpan;
  to: TimeSpan;
};

type GeoCoordinateDto = {
  lat: number;
  lng: number;
};

type LegalDto = {};

type ProviderProfileInsuranceDto = {
  insuranceId: Nullable<string>;
  subdivisionId: Nullable<string>;
};

type HealthcareDto = {
  insurances: Nullable<ProviderProfileInsuranceDto[]>;
  treatment: Nullable<string>;
  condition: Nullable<string>;
};

type AutocareDto = {
  insurance: Nullable<string>;
  vehicleType: VehicleType;
};

type HomecareDto = {};

type ChildcareDto = {};

type GalleryDto = {
  index: number;
  photoUrl: Nullable<string>;
  alt: Nullable<string>;
};

export type ProviderProfileLocationDto = {
  id: string;
  unitId: Nullable<string>;
  profileId: Nullable<string>;
  providerId: Nullable<string>;
  title: Nullable<string>;
  acceptingNewPatients: AcceptingNewPatientsStatus;
  languages: Nullable<string[]>;
  address: AddressDto;
  geoPoint: GeoCoordinateDto;
  workingHours: Nullable<WorkingHoursDto[]>;
  phone: Nullable<string>;
  fax: Nullable<string>;
};

export type ProviderProfileLookupItemDto = {
  profileId: Nullable<string>;
  createdUtc: string;
  createdBy: Nullable<string>;
  status: ProviderProfileStatus;
};

export type ProviderProfileDto = {
  id: string;
  providerId: Nullable<string>;
  prevProfileId: Nullable<string>;
  name: Nullable<string>;
  nameInternational: Nullable<string>;
  overview: Nullable<string>;
  overviewInternational: Nullable<string>;
  categoryId: number;
  gender: Gender;
  specialtyIds: Nullable<number[]>;
  languages: Nullable<string[]>;
  socialLinks: Nullable<SocialLinkDto[]>;
  education: Nullable<EducationDto[]>;
  awards: Nullable<AwardDto[]>;
  affiliations: Nullable<AffiliationDto[]>;
  services: Nullable<ServiceDto[]>;
  isIndividual: boolean;
  legal: LegalDto;
  mainUnitId: Nullable<string>;
  healthcare: HealthcareDto;
  autocare: AutocareDto;
  homecare: HomecareDto;
  childcare: ChildcareDto;
  gallery: Nullable<GalleryDto[]>;
  photoUrl: Nullable<string>;
  createdUtc: string;
  createdBy: Nullable<string>;
  status: ProviderProfileStatus;
  locations: Nullable<ProviderProfileLocationDto[]>;
  isOwnerExists: boolean;
};
