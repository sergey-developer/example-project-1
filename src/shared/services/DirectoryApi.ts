import env from 'config/env';
import { SpecialtyStatusEnum } from 'features/provider/types/models/SpecialtieStatusEnum';
import { Nullable } from 'shared/types';
import { CategoryDto, CategoryStatusDto } from 'shared/types/dto/CategoryDto';
import { InsuranceWithSubdivisionDto } from 'shared/types/dto/InsuranceWithSubdivisionDto';
import { SpecialtyDto } from 'shared/types/dto/SpecialtyDto';
import { SpecialtyWithTaxonomyRecordDto } from 'shared/types/dto/SpecialtyWithTaxonomyRecordDto';
import { LanguageSimpleRecordDto } from 'shared/types/generate';
import { V1DirectoryLanguagesListParams } from 'shared/types/generate/provider';

import BaseApi from './BaseApi';

type DirectoryApiVersions = 'v1' | 'v2';
type DirectoryApiVersionsKeys = 'current' | 'v2';

const apiVersions: Record<DirectoryApiVersionsKeys, DirectoryApiVersions> = {
  current: 'v1',
  v2: 'v2'
};

// TODO: move to common and reuse
type ExtraRequestConfig = {
  apiVersion: DirectoryApiVersionsKeys;
};

class DirectoryApi extends BaseApi {
  private static instance: DirectoryApi;

  public static getInstance(): DirectoryApi {
    if (!DirectoryApi.instance) {
      DirectoryApi.instance = new DirectoryApi();
    }

    return DirectoryApi.instance;
  }

  protected generatePath(
    subPath: string,
    apiVersion: DirectoryApiVersionsKeys = 'current'
  ): string {
    const version = apiVersions[apiVersion];

    return super.generatePath(subPath, version);
  }

  private constructor() {
    super(env.get('baseProviderApiUrl') as string, 'directory');
  }

  public getListCategories = async (
    status?: CategoryStatusDto,
    extra?: ExtraRequestConfig
  ): Promise<CategoryDto[]> => {
    const url = this.generatePath('categories', extra?.apiVersion);
    const response = await this.api.get<CategoryDto[]>(url, {
      params: {
        status
      }
    });

    return response.data;
  };

  public getOneCategoryById = async (
    categoryId: number,
    extra?: ExtraRequestConfig
  ): Promise<CategoryDto> => {
    const url = this.generatePath(`category/${categoryId}`, extra?.apiVersion);
    const response = await this.api.get<CategoryDto>(url);
    return response.data;
  };

  public getSpecialtiesByIds = async (
    specialtyIds: number[],
    extra?: ExtraRequestConfig
  ): Promise<SpecialtyDto[]> => {
    const specialty: SpecialtyDto[] = [];

    for (let i = 0; i < specialtyIds.length; i++) {
      const url = this.generatePath(
        `specialties/specialty/${specialtyIds[i]}`,
        extra?.apiVersion
      );

      const response = await this.api.get<SpecialtyDto>(url);
      specialty.push(response.data);
    }

    return specialty;
  };

  public getInsuranceById = async (
    insuranceId: string,
    extra?: ExtraRequestConfig
  ): Promise<InsuranceWithSubdivisionDto> => {
    const url = this.generatePath(
      `insurances/insurance/${insuranceId}`,
      extra?.apiVersion
    );

    const response = await this.api.get<InsuranceWithSubdivisionDto>(url);
    return response.data;
  };

  public getInsurancesByIds = async (insuranceIds: Nullable<string>[]) => {
    const insurances: InsuranceWithSubdivisionDto[] = [];

    for (let i = 0; i < insuranceIds.length; i++) {
      const insuranceId = insuranceIds[i];

      if (insuranceId) {
        const insurance = await this.getInsuranceById(insuranceId);
        insurances.push(insurance);
      }
    }

    return insurances;
  };

  public getInsurancesWithSubdivisionsByCategoryId = async (
    categoryId: number
  ): Promise<InsuranceWithSubdivisionDto[]> => {
    const url = this.generatePath(`insurances/${categoryId}`);

    const response = await this.api.get<InsuranceWithSubdivisionDto[]>(url);
    return response.data;
  };

  public getSpecialtiesWithTaxonomyRecord = async (
    categoryId: number,
    status: SpecialtyStatusEnum = SpecialtyStatusEnum.Active
  ): Promise<SpecialtyWithTaxonomyRecordDto[]> => {
    const url = this.generatePath(`specialties/${categoryId}`);

    const response = await this.api.get<SpecialtyWithTaxonomyRecordDto[]>(url, {
      params: { status }
    });
    return response.data;
  };

  public getSimpleLanguagesList = async (
    params?: V1DirectoryLanguagesListParams,
    extra?: ExtraRequestConfig
  ) => {
    const url = this.generatePath(`simple-languages`, extra?.apiVersion);

    const response = await this.api.get<LanguageSimpleRecordDto>(url, {
      params
    });

    return response.data;
  };

  //TODO Изменить на GET после того как в API изменят
  public getExistsRegionByRegionName = async (
    name: string,
    extra?: ExtraRequestConfig
  ) => {
    const url = this.generatePath(`region/exist/${name}`, extra?.apiVersion);
    const response = await this.api.post<boolean>(url);
    return response.data;
  };
}

export default DirectoryApi.getInstance();
