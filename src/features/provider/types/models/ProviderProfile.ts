import { Nullable } from 'shared/types';
import { Address } from 'shared/types/model/Address';
import { Category } from 'shared/types/model/Category';
import { Insurance } from 'shared/types/model/insurance/Insurance';
import { InsuranceSubdivision } from 'shared/types/model/insurance/InsuranceSubdivision';
import { Specialty } from 'shared/types/model/specialty/Specialty';

type Gender = 0 | 1 | 2;
type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;
type VehicleType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type SocialLinkType = 0 | 1 | 2 | 3 | 4 | 5;
type ProviderProfileStatus = 1 | 2 | 3 | 4;
type AcceptingNewPatientsStatus = 0 | 1 | 2;

type SocialLink = {
  socialType: SocialLinkType;
  url: Nullable<string>;
};

export type Education = {
  degree: Nullable<string>;
  schoolName: Nullable<string>;
  graduated: number;
  photoUrl: Nullable<string>;
};

export type Award = {
  name: Nullable<string>;
  year: number;
  photoUrl: Nullable<string>;
};

export type Affiliation = {
  name: Nullable<string>;
  webSite: Nullable<string>;
};

export type Service = {
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

type WorkingHours = {
  day: DayOfWeek;
  from: TimeSpan;
  to: TimeSpan;
};

type GeoCoordinate = {
  lat: number;
  lng: number;
};

type Legal = {};

export type InsuranceWithSubdivisions = {
  insurance: Insurance;
  insuranceSubdivision: Nullable<InsuranceSubdivision[]>;
};

export type ProviderProfileInsurance = {
  insuranceId: Nullable<string>;
  //TODO Удалить после проверки с реальными данными
  // insurance?: Nullable<InsuranceWithSubdivisions>;
  subdivisionId: Nullable<string>;

  insuranceName?: Nullable<string>;
  subdivisionName?: Nullable<string>;
};

type Healthcare = {
  insurances: Nullable<ProviderProfileInsurance[]>;
  treatment: Nullable<string>;
  condition: Nullable<string>;
};

type Autocare = {
  insurance: Nullable<string>;
  vehicleType: VehicleType;
};

type Homecare = {};

type Childcare = {};

type Gallery = {
  index: number;
  photoUrl: Nullable<string>;
  alt: Nullable<string>;
};

export type ProviderProfileLocation = {
  id: string;
  unitId: Nullable<string>;
  profileId: Nullable<string>;
  providerId: Nullable<string>;
  title: Nullable<string>;
  acceptingNewPatients: AcceptingNewPatientsStatus;
  languages: Nullable<string[]>;
  address: Address;
  geoPoint: GeoCoordinate;
  workingHours: Nullable<WorkingHours[]>;
  phone: Nullable<string>;
  fax: Nullable<string>;
};

export type ProviderProfileLookupItem = {
  profileId: Nullable<string>;
  createdUtc: string;
  createdBy: Nullable<string>;
  status: ProviderProfileStatus;
};

export type ProviderProfile = {
  id: string;
  providerId: Nullable<string>;
  prevProfileId: Nullable<string>;
  name: Nullable<string>;
  nameInternational: Nullable<string>;
  overview: Nullable<string>;
  overviewInternational: Nullable<string>;
  category: Category;
  gender: Gender;
  specialties: Specialty[];
  languages: Nullable<string[]>;
  socialLinks: Nullable<SocialLink[]>;
  education: Nullable<Education[]>;
  awards: Nullable<Award[]>;
  affiliations: Nullable<Affiliation[]>;
  services: Nullable<Service[]>;
  isIndividual: boolean;
  legal: Legal;
  mainUnitId: Nullable<string>;
  healthcare: Nullable<Healthcare>;
  autocare: Autocare;
  homecare: Homecare;
  childcare: Childcare;
  gallery: Nullable<Gallery[]>;
  photoUrl: Nullable<string>;
  createdUtc: string;
  createdBy: Nullable<string>;
  status: ProviderProfileStatus;
  locations: Nullable<ProviderProfileLocation[]>;
  isOwnerExists: boolean;
};
