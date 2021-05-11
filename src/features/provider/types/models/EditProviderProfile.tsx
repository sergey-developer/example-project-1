import {
  EditProviderLocationDto,
  EditProviderStatus,
  ProfileLegalDto
} from 'shared/types/generate';

export type EnumsGender = 0 | 1 | 2;
export type EnumsSocialLinkType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface ProfileSocialLinkModel {
  socialType?: EnumsSocialLinkType;
  url?: string | null;
}

export interface ProfileEducationModel {
  degree?: string | null;
  schoolName?: string | null;

  /** @format int32 */
  graduated?: number;
  photoUrl?: string | null;
}

export interface ProfileAwardModel {
  name?: string | null;

  /** @format int32 */
  year?: number;
  photoUrl?: string | null;
}

export interface ProfileAffiliationModel {
  name?: string | null;
  webSite?: string | null;
}

export type ProfileLegalModel = ProfileLegalDto;

export interface ProfileInsuranceModel {
  insuranceId?: string | null;
  subdivisionId?: string | null;
}

export interface ProfileHealthcareModel {
  insurances?: ProfileInsuranceModel[] | null;
  treatment?: string | null;
  condition?: string | null;
}

export type EnumsVehicleType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface ProfileAutocareModel {
  insurance?: string | null;
  vehicleType?: EnumsVehicleType;
}

export type ProfileHomecareModel = {};

export type ProfileChildcareModel = {};

export interface ProfileGalleryModel {
  /** @format int32 */
  index?: number;
  photoUrl?: string | null;
  alt?: string | null;
}

export type CategoryStatusModel = 0 | 1 | 2 | 3;

export type CategoryModel = {
  id: number;
  text: string;
  status: CategoryStatusModel;
};

export interface ProfileServiceModel {
  name?: string | null;
  description?: string | null;
  imageUrl?: string | null;
}

export interface ServiceInProfileModel {
  id?: string | null;
  target?: ProfileServiceModel;
  removed?: boolean;
}

export interface ProfileProfileAttributesModel {
  name?: string | null;
  nameInternational?: string | null;
  overview?: string | null;
  overviewInternational?: string | null;
  gender?: EnumsGender;
  specialtyIds?: number[] | null;
  languages?: string[] | null;
  socialLinks?: ProfileSocialLinkModel[] | null;
  education?: ProfileEducationModel[] | null;
  awards?: ProfileAwardModel[] | null;
  affiliations?: ProfileAffiliationModel[] | null;
  isIndividual?: boolean | null;
  legal?: ProfileLegalModel;
  mainUnitId?: string | null;
  healthcare?: ProfileHealthcareModel;
  autocare?: ProfileAutocareModel;
  homecare?: ProfileHomecareModel;
  childcare?: ProfileChildcareModel;
  gallery?: ProfileGalleryModel[] | null;
  photoUrl?: string | null;
  coverImageUrl?: string | null;
  category?: CategoryModel;
}

export enum EditProviderStatusEnum {
  Undefined = 0,
  Pristine = 1,
  Modified = 2,
  UpdateInProgress = 3,
  OwnershipPending = 4
}

export interface ProfileEditProviderModel {
  providerId?: string | null;
  profileId?: string | null;
  profile?: ProfileProfileAttributesModel;
  locations?: EditProviderLocationDto[] | null;
  services?: ServiceInProfileModel[] | null;
  providerStatus?: EditProviderStatusEnum;
}

export enum ProfileEditElementType {
  LOCATION = 'location',
  SERVICE = 'service'
}
