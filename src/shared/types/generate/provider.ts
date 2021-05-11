/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface MicrosoftAspNetCoreMvcProblemDetails {
  type?: string | null;
  title?: string | null;

  /** @format int32 */
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
}

export interface ExampleProjectProvidersDtoCommonListEntity1ExampleProjectProvidersDtoProfileLocationAttributesDtoExampleProjectProvidersDtoVersion5100CultureNeutralPublicKeyTokenNull {
  id?: string | null;
  target?: ExampleProjectProvidersDtoProfileLocationAttributesDto;
  removed?: boolean;
}

export interface ExampleProjectProvidersDtoCommonListEntity1ExampleProjectProvidersDtoProfileServiceDtoExampleProjectProvidersDtoVersion5100CultureNeutralPublicKeyTokenNull {
  id?: string | null;
  target?: ExampleProjectProvidersDtoProfileServiceDto;
  removed?: boolean;
}

export interface ExampleProjectProvidersDtoDirectoryCategoryRecordDto {
  /** @format int32 */
  id?: number;
  text?: string | null;

  /** 0 = Draft, 1 = Active, 2 = Move, 3 = Remove */
  status?: ExampleProjectProvidersDtoEnumsDirectoryRecordStatus;
}

export interface ExampleProjectProvidersDtoDirectoryInsuranceDto {
  id?: string | null;

  /** @format int32 */
  code?: number;
  name?: string | null;
  regionId?: string | null;

  /** @format int32 */
  categoryId?: number;
  description?: string | null;
  officialName?: string | null;
}

export interface ExampleProjectProvidersDtoDirectoryInsuranceSubdivisionDto {
  id?: string | null;

  /** @format int32 */
  code?: number;
  name?: string | null;
  regionId?: string | null;

  /** @format int32 */
  categoryId?: number;
  address?: ExampleProjectProvidersDtoProfileAddressDto;
  insuranceId?: string | null;
}

export interface ExampleProjectProvidersDtoDirectoryInsuranceWithSubdivisionDto {
  insurance?: ExampleProjectProvidersDtoDirectoryInsuranceDto;
  insuranceSubdivision?: ExampleProjectProvidersDtoDirectoryInsuranceSubdivisionDto;
}

export interface ExampleProjectProvidersDtoDirectoryInsuranceWithSubdivisionsDto {
  insurance?: ExampleProjectProvidersDtoDirectoryInsuranceDto;
  insuranceSubdivision?:
    | ExampleProjectProvidersDtoDirectoryInsuranceSubdivisionDto[]
    | null;
}

export interface ExampleProjectProvidersDtoDirectoryLanguageItemDto {
  name?: string | null;
  codes?: string[] | null;
  defaultCode?: string | null;
}

export interface ExampleProjectProvidersDtoDirectoryLanguageRecordDto {
  /** @format int32 */
  id?: number;
  text?: string | null;

  /** 0 = Draft, 1 = Active, 2 = Move, 3 = Remove */
  status?: ExampleProjectProvidersDtoEnumsDirectoryRecordStatus;
  country?: ExampleProjectProvidersDtoDirectoryLanguageItemDto;
  language?: ExampleProjectProvidersDtoDirectoryLanguageItemDto;
  cultureInfoCode?: string | null;
}

export interface ExampleProjectProvidersDtoDirectoryLanguageSimpleRecordDto {
  id?: string | null;
  text?: string | null;
}

export interface ExampleProjectProvidersDtoDirectoryRegionDto {
  id?: string | null;
  name?: string | null;
  nativeName?: string | null;
  primaryLanguage?: string | null;
  hasSecondLanguage?: boolean;
  secondaryLanguage?: string | null;

  /** 0 = None, 1 = Active */
  status?: ExampleProjectProvidersDtoEnumsRegionStatus;
}

export interface ExampleProjectProvidersDtoDirectorySpecialtyRecordDto {
  /** @format int32 */
  id?: number;
  text?: string | null;

  /** 0 = Draft, 1 = Active, 2 = Move, 3 = Remove */
  status?: ExampleProjectProvidersDtoEnumsDirectoryRecordStatus;

  /** @format int32 */
  categoryId?: number;
}

export interface ExampleProjectProvidersDtoDirectorySpecialtyWithTaxonomyRecordDto {
  /** @format int32 */
  id?: number;
  text?: string | null;

  /** 0 = Draft, 1 = Active, 2 = Move, 3 = Remove */
  status?: ExampleProjectProvidersDtoEnumsDirectoryRecordStatus;

  /** @format int32 */
  categoryId?: number;
  taxonomyCodes?: string[] | null;
}

/**
 * 0 = Undefined, 1 = Accept, 2 = NotAccept
 * @format int32
 */
export type ExampleProjectProvidersDtoEnumsAcceptingNewPatientsStatus = 0 | 1 | 2;

/**
 * 1 = Pended, 2 = Approved, 3 = Declined, 4 = Canceled
 * @format int32
 */
export type ExampleProjectProvidersDtoEnumsClaimStatus = 1 | 2 | 3 | 4;

/**
 * 1 = Ownership, 2 = Create, 3 = Update, 4 = Remove
 * @format int32
 */
export type ExampleProjectProvidersDtoEnumsClaimType = 1 | 2 | 3 | 4;

/**
 * 0 = Draft, 1 = Active, 2 = Move, 3 = Remove
 * @format int32
 */
export type ExampleProjectProvidersDtoEnumsDirectoryRecordStatus = 0 | 1 | 2 | 3;

/**
 * 0 = Undefined, 1 = Male, 2 = Female
 * @format int32
 */
export type ExampleProjectProvidersDtoEnumsGender = 0 | 1 | 2;

/**
 * 1 = New, 2 = OnReview, 3 = Approved, 4 = Declined
 * @format int32
 */
export type ExampleProjectProvidersDtoEnumsProfileStatus = 1 | 2 | 3 | 4;

/**
 * 1 = Draft, 2 = Active, 3 = Inactive, 4 = Remove
 * @format int32
 */
export type ExampleProjectProvidersDtoEnumsProviderStatus = 1 | 2 | 3 | 4;

/**
 * 0 = None, 1 = Active
 * @format int32
 */
export type ExampleProjectProvidersDtoEnumsRegionStatus = 0 | 1;

/**
 * 0 = Undefined, 1 = Facebook, 2 = Twitter, 3 = Instagram, 4 = Email, 5 = Website, 6 = Reddit, 7 = Whatsapp, 8 = LinkedIn
 * @format int32
 */
export type ExampleProjectProvidersDtoEnumsSocialLinkType =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8;

/**
 * 1 = Success, 2 = Failure
 * @format int32
 */
export type ExampleProjectProvidersDtoEnumsUpdateResponseStatus = 1 | 2;

/**
 * 1 = Sedan, 2 = Coupe, 3 = SportsCar, 4 = StationWagon, 5 = Hatchback, 6 = Convertible, 7 = SUV, 8 = Minivan, 9 = PickupTruck
 * @format int32
 */
export type ExampleProjectProvidersDtoEnumsVehicleType =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9;

export interface ExampleProjectProvidersDtoErrorOcError {
  /** 0 = Unknown */
  code?: ExampleProjectProvidersDtoErrorOcErrorCodes;
  description?: string | null;
  type?: string | null;
  header?: string | null;
}

/**
 * 0 = Unknown
 * @format int32
 */
export type ExampleProjectProvidersDtoErrorOcErrorCodes = 0;

export interface ExampleProjectProvidersDtoProfileAddressDto {
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  zipCodeFull?: string | null;
  country?: string | null;
}

export interface ExampleProjectProvidersDtoProfileAffiliationDto {
  name?: string | null;
  webSite?: string | null;
}

export interface ExampleProjectProvidersDtoProfileAutocareDto {
  insurance?: string | null;

  /** 1 = Sedan, 2 = Coupe, 3 = SportsCar, 4 = StationWagon, 5 = Hatchback, 6 = Convertible, 7 = SUV, 8 = Minivan, 9 = PickupTruck */
  vehicleType?: ExampleProjectProvidersDtoEnumsVehicleType;
}

export interface ExampleProjectProvidersDtoProfileAwardDto {
  name?: string | null;

  /** @format int32 */
  year?: number;
  photoUrl?: string | null;
}

export interface ExampleProjectProvidersDtoProfileBulkImportProviderProfileDto {
  name?: string | null;
  nameInternational?: string | null;
  overview?: string | null;
  overviewInternational?: string | null;

  /** 0 = Undefined, 1 = Male, 2 = Female */
  gender?: ExampleProjectProvidersDtoEnumsGender;
  specialtyIds?: number[] | null;
  languages?: string[] | null;
  socialLinks?: ExampleProjectProvidersDtoProfileSocialLinkDto[] | null;
  education?: ExampleProjectProvidersDtoProfileEducationDto[] | null;
  awards?: ExampleProjectProvidersDtoProfileAwardDto[] | null;
  affiliations?: ExampleProjectProvidersDtoProfileAffiliationDto[] | null;
  isIndividual?: boolean | null;
  legal?: ExampleProjectProvidersDtoProfileLegalDto;
  mainUnitId?: string | null;
  healthcare?: ExampleProjectProvidersDtoProfileHealthcareDto;
  autocare?: ExampleProjectProvidersDtoProfileAutocareDto;
  homecare?: ExampleProjectProvidersDtoProfileHomecareDto;
  childcare?: ExampleProjectProvidersDtoProfileChildcareDto;
  gallery?: ExampleProjectProvidersDtoProfileGalleryDto[] | null;
  photoUrl?: string | null;
  coverImageUrl?: string | null;
  id?: string | null;
  providerId?: string | null;
  prevProfileId?: string | null;

  /** @format int32 */
  categoryId?: number;
  services?: ExampleProjectProvidersDtoProfileServiceDto[] | null;
  locations?: ExampleProjectProvidersDtoProfileLocationDto[] | null;

  /** @format date-time */
  createdUtc?: string;
  createdBy?: string | null;

  /** 1 = New, 2 = OnReview, 3 = Approved, 4 = Declined */
  status?: ExampleProjectProvidersDtoEnumsProfileStatus;
  isOwnerExists?: boolean;
  externalId?: string | null;
}

export interface ExampleProjectProvidersDtoProfileBulkImportRequestDto {
  sessionUuid?: string | null;
  sourceName?: string | null;

  /** @format int64 */
  sourceSize?: number;

  /** @format byte */
  sourceHash?: string | null;
  regionId?: string | null;

  /** @format int64 */
  position?: number;

  /** @format int64 */
  size?: number;
  data?: ExampleProjectProvidersDtoProfileBulkImportProviderProfileDto[] | null;
}

export interface ExampleProjectProvidersDtoProfileBulkImportResponseDto {
  /** 1 = Success, 2 = Failure */
  status?: ExampleProjectProvidersDtoEnumsUpdateResponseStatus;
  batchId?: string | null;
  error?: string | null;
}

export type ExampleProjectProvidersDtoProfileChildcareDto = object;

export interface ExampleProjectProvidersDtoProfileClaimDto {
  id?: string | null;

  /** @format date-time */
  date?: string;

  /** 1 = Ownership, 2 = Create, 3 = Update, 4 = Remove */
  type?: ExampleProjectProvidersDtoEnumsClaimType;
  providerId?: string | null;
  profileId?: string | null;
  regionId?: string | null;
  providerName?: string | null;

  /** 1 = Pended, 2 = Approved, 3 = Declined, 4 = Canceled */
  status?: ExampleProjectProvidersDtoEnumsClaimStatus;

  /** @format date-time */
  decisionUtc?: string;
  decisionMaker?: string | null;
  message?: string | null;
  banUser?: boolean;
  attachments?: string[] | null;
  userId?: string | null;
  email?: string | null;
  name?: string | null;
  roles?: string[] | null;
}

export interface ExampleProjectProvidersDtoProfileClaimListDto {
  claims?: ExampleProjectProvidersDtoProfileClaimDto[] | null;

  /** @format int64 */
  total?: number;
}

export interface ExampleProjectProvidersDtoProfileCreateProviderRequestDto {
  name: string;
  nameInternational?: string | null;

  /** @format int32 */
  categoryId: number;
  specialtyIds: number[];
  isIndividual: boolean;

  /** @format tel */
  phone: string;

  /** @format email */
  email: string;
  regionId: string;
  address: ExampleProjectProvidersDtoProfileAddressDto;
  geoPoint: ExampleProjectProvidersDtoProfileGeoCoordinateDto;
  npi?: string | null;
}

export interface ExampleProjectProvidersDtoProfileCreateProviderResponseDto {
  successful?: boolean;
  providerId?: string | null;
  error?: ExampleProjectProvidersDtoErrorOcError;
}

export interface ExampleProjectProvidersDtoProfileEditProviderEditProviderDto {
  providerId?: string | null;
  profileId?: string | null;
  profile?: ExampleProjectProvidersDtoProfileProfileAttributesDto;
  locations?:
    | ExampleProjectProvidersDtoCommonListEntity1ExampleProjectProvidersDtoProfileLocationAttributesDtoExampleProjectProvidersDtoVersion5100CultureNeutralPublicKeyTokenNull[]
    | null;
  services?:
    | ExampleProjectProvidersDtoCommonListEntity1ExampleProjectProvidersDtoProfileServiceDtoExampleProjectProvidersDtoVersion5100CultureNeutralPublicKeyTokenNull[]
    | null;

  /** 0 = Undefined, 1 = Pristine, 2 = Modified, 3 = UpdateInProgress, 4 = OwnershipPending */
  providerStatus?: ExampleProjectProvidersDtoProfileEditProviderEditProviderStatus;
}

/**
 * 0 = Undefined, 1 = Pristine, 2 = Modified, 3 = UpdateInProgress, 4 = OwnershipPending
 * @format int32
 */
export type ExampleProjectProvidersDtoProfileEditProviderEditProviderStatus =
  | 0
  | 1
  | 2
  | 3
  | 4;

export interface ExampleProjectProvidersDtoProfileEducationDto {
  degree?: string | null;
  schoolName?: string | null;

  /** @format int32 */
  graduated?: number;
  photoUrl?: string | null;
}

export interface ExampleProjectProvidersDtoProfileExistProviderResponseDto {
  ids?: string[] | null;
  exist?: boolean;
  hasOwner?: boolean;
}

export interface ExampleProjectProvidersDtoProfileGalleryDto {
  /** @format int32 */
  index?: number;
  photoUrl?: string | null;
  alt?: string | null;
}

export interface ExampleProjectProvidersDtoProfileGeoCoordinateDto {
  /** @format double */
  lat?: number;

  /** @format double */
  lng?: number;
}

export interface ExampleProjectProvidersDtoProfileHealthcareDto {
  insurances?: ExampleProjectProvidersDtoProfileProviderProfileInsuranceDto[] | null;
  treatment?: string | null;
  condition?: string | null;
}

export type ExampleProjectProvidersDtoProfileHomecareDto = object;

export interface ExampleProjectProvidersDtoProfileLegalDto {
  bankName?: string | null;
  bankAddress?: string | null;
  swift?: string | null;
  accountNumber?: string | null;
  routingNumber?: string | null;
  accountHolderNmae?: string | null;
}

export interface ExampleProjectProvidersDtoProfileLocationAttributesDto {
  title?: string | null;

  /** 0 = Undefined, 1 = Accept, 2 = NotAccept */
  acceptingNewPatients?: ExampleProjectProvidersDtoEnumsAcceptingNewPatientsStatus;
  languages?: string[] | null;
  address?: ExampleProjectProvidersDtoProfileAddressDto;
  geoPoint?: ExampleProjectProvidersDtoProfileGeoCoordinateDto;
  workingHours?: ExampleProjectProvidersDtoProfileWorkingHoursDto[] | null;
  socialLinks?: ExampleProjectProvidersDtoProfileSocialLinkDto[] | null;
  phone?: string | null;
  fax?: string | null;
  unitId?: string | null;
}

export interface ExampleProjectProvidersDtoProfileLocationDto {
  title?: string | null;

  /** 0 = Undefined, 1 = Accept, 2 = NotAccept */
  acceptingNewPatients?: ExampleProjectProvidersDtoEnumsAcceptingNewPatientsStatus;
  languages?: string[] | null;
  address?: ExampleProjectProvidersDtoProfileAddressDto;
  geoPoint?: ExampleProjectProvidersDtoProfileGeoCoordinateDto;
  workingHours?: ExampleProjectProvidersDtoProfileWorkingHoursDto[] | null;
  socialLinks?: ExampleProjectProvidersDtoProfileSocialLinkDto[] | null;
  phone?: string | null;
  fax?: string | null;
  unitId?: string | null;
  id?: string | null;
  profileId?: string | null;
  providerId?: string | null;
}

export interface ExampleProjectProvidersDtoProfileLocationListRequestDto {
  items?: ExampleProjectProvidersDtoProfileProfileLocationRequestDto[] | null;
}

export interface ExampleProjectProvidersDtoProfileProfileAttributesDto {
  name?: string | null;
  nameInternational?: string | null;
  overview?: string | null;
  overviewInternational?: string | null;

  /** 0 = Undefined, 1 = Male, 2 = Female */
  gender?: ExampleProjectProvidersDtoEnumsGender;
  specialtyIds?: number[] | null;
  languages?: string[] | null;
  socialLinks?: ExampleProjectProvidersDtoProfileSocialLinkDto[] | null;
  education?: ExampleProjectProvidersDtoProfileEducationDto[] | null;
  awards?: ExampleProjectProvidersDtoProfileAwardDto[] | null;
  affiliations?: ExampleProjectProvidersDtoProfileAffiliationDto[] | null;
  isIndividual?: boolean | null;
  legal?: ExampleProjectProvidersDtoProfileLegalDto;
  mainUnitId?: string | null;
  healthcare?: ExampleProjectProvidersDtoProfileHealthcareDto;
  autocare?: ExampleProjectProvidersDtoProfileAutocareDto;
  homecare?: ExampleProjectProvidersDtoProfileHomecareDto;
  childcare?: ExampleProjectProvidersDtoProfileChildcareDto;
  gallery?: ExampleProjectProvidersDtoProfileGalleryDto[] | null;
  photoUrl?: string | null;
  coverImageUrl?: string | null;
}

export interface ExampleProjectProvidersDtoProfileProfileLocationDto {
  profile?: ExampleProjectProvidersDtoProfileProviderProfileHeaderDto;
  location?: ExampleProjectProvidersDtoProfileLocationDto;
}

export interface ExampleProjectProvidersDtoProfileProfileLocationRequestDto {
  profileId?: string | null;
  locationId?: string | null;
}

export interface ExampleProjectProvidersDtoProfileProfileLookupItem {
  profileId?: string | null;

  /** @format date-time */
  createdUtc?: string;
  createdBy?: string | null;

  /** 1 = New, 2 = OnReview, 3 = Approved, 4 = Declined */
  status?: ExampleProjectProvidersDtoEnumsProfileStatus;
}

export interface ExampleProjectProvidersDtoProfileProviderDto {
  id?: string | null;
  name?: string | null;

  /** @format int32 */
  categoryId?: number;

  /** @format int64 */
  version?: number;
  activeProfileId?: string | null;

  /** @format date-time */
  createdUtc?: string;
  createdBy?: string | null;

  /** @format date-time */
  updatedUtc?: string;
  updatedBy?: string | null;

  /** 1 = Draft, 2 = Active, 3 = Inactive, 4 = Remove */
  status?: ExampleProjectProvidersDtoEnumsProviderStatus;
  batchId?: string | null;
  regionId?: string | null;
  externalId?: string | null;
  profiles?: ExampleProjectProvidersDtoProfileProfileLookupItem[] | null;
  isOwnerExists?: boolean;
}

export interface ExampleProjectProvidersDtoProfileProviderProfileDto {
  name?: string | null;
  nameInternational?: string | null;
  overview?: string | null;
  overviewInternational?: string | null;

  /** 0 = Undefined, 1 = Male, 2 = Female */
  gender?: ExampleProjectProvidersDtoEnumsGender;
  specialtyIds?: number[] | null;
  languages?: string[] | null;
  socialLinks?: ExampleProjectProvidersDtoProfileSocialLinkDto[] | null;
  education?: ExampleProjectProvidersDtoProfileEducationDto[] | null;
  awards?: ExampleProjectProvidersDtoProfileAwardDto[] | null;
  affiliations?: ExampleProjectProvidersDtoProfileAffiliationDto[] | null;
  isIndividual?: boolean | null;
  legal?: ExampleProjectProvidersDtoProfileLegalDto;
  mainUnitId?: string | null;
  healthcare?: ExampleProjectProvidersDtoProfileHealthcareDto;
  autocare?: ExampleProjectProvidersDtoProfileAutocareDto;
  homecare?: ExampleProjectProvidersDtoProfileHomecareDto;
  childcare?: ExampleProjectProvidersDtoProfileChildcareDto;
  gallery?: ExampleProjectProvidersDtoProfileGalleryDto[] | null;
  photoUrl?: string | null;
  coverImageUrl?: string | null;
  id?: string | null;
  providerId?: string | null;
  prevProfileId?: string | null;

  /** @format int32 */
  categoryId?: number;
  services?: ExampleProjectProvidersDtoProfileServiceDto[] | null;
  locations?: ExampleProjectProvidersDtoProfileLocationDto[] | null;

  /** @format date-time */
  createdUtc?: string;
  createdBy?: string | null;

  /** 1 = New, 2 = OnReview, 3 = Approved, 4 = Declined */
  status?: ExampleProjectProvidersDtoEnumsProfileStatus;
  isOwnerExists?: boolean;
}

export interface ExampleProjectProvidersDtoProfileProviderProfileHeaderDto {
  id?: string | null;
  providerId?: string | null;
  name?: string | null;
  nameInternational?: string | null;
  overview?: string | null;
  overviewInternational?: string | null;

  /** @format int32 */
  categoryId?: number;
  specialtyIds?: number[] | null;
  languages?: string[] | null;
  socialLinks?: ExampleProjectProvidersDtoProfileSocialLinkDto[] | null;
  isIndividual?: boolean | null;
  photoUrl?: string | null;
  coverImageUrl?: string | null;

  /** @format date-time */
  createdUtc?: string;
  createdBy?: string | null;

  /** 1 = New, 2 = OnReview, 3 = Approved, 4 = Declined */
  status?: ExampleProjectProvidersDtoEnumsProfileStatus;
}

export interface ExampleProjectProvidersDtoProfileProviderProfileInsuranceDto {
  insuranceId?: string | null;
  subdivisionId?: string | null;
}

export interface ExampleProjectProvidersDtoProfileProviderProfileLocationDto {
  profile?: ExampleProjectProvidersDtoProfileProviderProfileDto;
  location?: ExampleProjectProvidersDtoProfileLocationDto;

  /** @format int64 */
  totalLocations?: number;
}

export interface ExampleProjectProvidersDtoProfilePushClaimRequest {
  /** 1 = Ownership, 2 = Create, 3 = Update, 4 = Remove */
  type: ExampleProjectProvidersDtoEnumsClaimType;
  providerId: string;
  profileId?: string | null;
  regionId: string;
  providerName: string;
  attachments?: string[] | null;
}

export interface ExampleProjectProvidersDtoProfilePushProfileRequestDto {
  profile?: ExampleProjectProvidersDtoProfileProviderProfileDto;
}

export interface ExampleProjectProvidersDtoProfileResolveClaimRequest {
  claimId: string;
  message?: string | null;

  /** 1 = Pended, 2 = Approved, 3 = Declined, 4 = Canceled */
  status: ExampleProjectProvidersDtoEnumsClaimStatus;
}

export interface ExampleProjectProvidersDtoProfileResolveClaimResponse {
  ids?: string[] | null;

  /** 1 = Success, 2 = Failure */
  status?: ExampleProjectProvidersDtoEnumsUpdateResponseStatus;
  message?: string | null;
}

export interface ExampleProjectProvidersDtoProfileServiceDto {
  name?: string | null;
  description?: string | null;
  imageUrl?: string | null;
}

export interface ExampleProjectProvidersDtoProfileSocialLinkDto {
  /** 0 = Undefined, 1 = Facebook, 2 = Twitter, 3 = Instagram, 4 = Email, 5 = Website, 6 = Reddit, 7 = Whatsapp, 8 = LinkedIn */
  socialType?: ExampleProjectProvidersDtoEnumsSocialLinkType;
  url?: string | null;
}

export interface ExampleProjectProvidersDtoProfileUpdateProviderRequestDto {
  newActiveProfileId?: string | null;

  /** 1 = Draft, 2 = Active, 3 = Inactive, 4 = Remove */
  newStatus?: ExampleProjectProvidersDtoEnumsProviderStatus;
}

export interface ExampleProjectProvidersDtoProfileUpdateResponseDto {
  ids?: string[] | null;

  /** 1 = Success, 2 = Failure */
  status?: ExampleProjectProvidersDtoEnumsUpdateResponseStatus;
}

export interface ExampleProjectProvidersDtoProfileWorkingHoursDto {
  /** 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday */
  day?: SystemDayOfWeek;

  /** @format int32 */
  from?: number;

  /** @format int32 */
  to?: number;
}

export interface ExampleProjectProvidersModelsClaimsProviderClaimsQuery {
  /** Claim type filter */
  types?: ExampleProjectProvidersDtoEnumsClaimType[] | null;

  /** Claim status filter */
  statuses?: ExampleProjectProvidersDtoEnumsClaimStatus[] | null;

  /**
   * Pane number
   * @format int32
   */
  page?: number;

  /**
   * Page size
   * @format int32
   */
  size?: number;
}

/**
 * 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday
 * @format int32
 */
export type SystemDayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface V1ClaimListListParams {
  /**
   * Claims created after
   * @format date-time
   */
  from?: string;

  /**
   * Claims created before
   * @format date-time
   */
  to?: string;

  /** Claims containing text */
  textQuery?: string;

  /** Claim type1 = Ownership, 2 = Create, 3 = Update, 4 = Remove */
  type?: ExampleProjectProvidersDtoEnumsClaimType;

  /** Claims with status1 = Pended, 2 = Approved, 3 = Declined, 4 = Canceled */
  status?: ExampleProjectProvidersDtoEnumsClaimStatus;

  /**
   * Page number
   * @format int32
   */
  page?: number;

  /**
   * Page size
   * @format int32
   */
  size?: number;
}

export interface V1DirectoryCategoriesListParams {
  /** Filter categories by status (optional)0 = Draft, 1 = Active, 2 = Move, 3 = Remove */
  status?: ExampleProjectProvidersDtoEnumsDirectoryRecordStatus;
}

export interface V1DirectorySpecialtiesDetailParams {
  /** Filter specialties by status (optional)0 = Draft, 1 = Active, 2 = Move, 3 = Remove */
  status?: ExampleProjectProvidersDtoEnumsDirectoryRecordStatus;

  /**
   * Filter specialties by category ID (optional)
   * @format int32
   */
  categoryId: number;
}

export interface V1DirectoryRegionsListParams {
  /** Filter regions by status (optional)0 = None, 1 = Active */
  status?: ExampleProjectProvidersDtoEnumsRegionStatus;
}

export interface V1DirectoryInsurancesDetailParams {
  /** Filter insurances by region (optional) */
  regionId?: string;

  /** Include subdivision data in output model (optional) */
  isSubdivisionsNeed?: boolean;

  /**
   * Filter insurances by category ID (optional)
   * @format int32
   */
  categoryId: number;
}

export interface V1DirectoryInsurancesInsuranceDetailParams {
  /** Include subdivision data in output model (optional) */
  isSubdivisionsNeed?: boolean;

  /** Insurance ID */
  insuranceId: string;
}

export interface V1DirectoryInsurancesSubdivisionDetailParams {
  /** Insurances with region */
  regionId?: string;

  /** Subdivisions with text in name (optional) */
  searchText?: string;

  /**
   * Insurances with category ID (optional)
   * @format int32
   */
  categoryId: number;
}

export interface V1DirectoryLanguagesListParams {
  /** Filter languages by status (optional)0 = Draft, 1 = Active, 2 = Move, 3 = Remove */
  status?: ExampleProjectProvidersDtoEnumsDirectoryRecordStatus;
}

export interface V1DirectorySimpleLanguagesListParams {
  /** Filter languages by status (optional)0 = Draft, 1 = Active, 2 = Move, 3 = Remove */
  status?: ExampleProjectProvidersDtoEnumsDirectoryRecordStatus;
}
