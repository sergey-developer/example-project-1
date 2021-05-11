import {
  call,
  debounce,
  put,
  select,
  takeEvery,
  takeLatest
} from '@redux-saga/core/effects';

import { DEBOUNCE_VALUE } from 'config/common';
import { ProviderApi } from 'features/provider/services';
import { DirectoryApi, SearchApi } from 'shared/services';
import { SpecialtyWithTaxonomyRecordDto } from 'shared/types/dto/SpecialtyWithTaxonomyRecordDto';
import { ErrorTypes } from 'shared/types/error/error-types';
import {
  CreateProviderRequestDto,
  CreateProviderResponseDto,
  ExistProviderResponseDto,
  ProfileGeoCoordinateDto,
  ProfileProviderDto,
  ProviderProfileDto
} from 'shared/types/generate';
import { SearchHintResponse } from 'shared/types/model/Search';
import { pick } from 'shared/utils/pick';

import {
  ChangeNPIRequestAction,
  ChangeProviderNameAction,
  GetExistsProvidersInfoRequestAction,
  GetSimilarNameProfilesRequestAction,
  GetSpecialtiesByCategoryRequestAction,
  SetCategoryAction,
  SetLocationAction
} from './actionTypes';
import {
  changeNPIRequest,
  changeProviderName,
  checkExistsProvidersRequest,
  checkExistsProvidersSuccess,
  createProfileRequest,
  createProfileSuccess,
  getAllSimilarNameProviderProfilesSuccess,
  getExistsProvidersInfoRequest,
  getSimilarNameProviderProfileSuccess,
  getSimilarNameProviderProfilesRequest,
  getSpecialtiesByCategoryRequest,
  getSpecialtiesByCategorySuccess,
  providerAlreadyExists,
  setCategory,
  setExistsProviderInfo,
  setLocationError,
  setLocationRequest,
  setLocationSuccess
} from './createProviderSlice';
import {
  createProviderLocationSelector,
  createProviderStateSelector
} from './selectors';
import { CreateProviderState } from './state';

function* setLocationRequestSaga({ payload }: SetLocationAction) {
  const { address, addressFull } = payload;
  const country = address.country;

  if (country) {
    try {
      const response: boolean = yield call(
        DirectoryApi.getExistsRegionByRegionName,
        country
      );

      if (!addressFull) {
        yield put(
          setLocationError({
            error: {
              type: ErrorTypes.ADDRESS_NOT_FULL
            },
            address
          })
        );
        return;
      }

      if (response) {
        yield put(
          setLocationSuccess({
            ...payload,
            regionId: country
          })
        );
      } else {
        yield put(
          setLocationError({
            error: {
              type: ErrorTypes.REGION_IS_NOT_EXISTS
            },
            address
          })
        );
      }
    } catch (error) {}
  }
}

function* setCategorySaga({ payload }: SetCategoryAction) {
  const { categoryId } = payload;
  yield put(
    getSpecialtiesByCategoryRequest({
      categoryId
    })
  );
}

function* getSpecialtiesByCategoryRequestSaga({
  payload
}: GetSpecialtiesByCategoryRequestAction) {
  try {
    const specialties: SpecialtyWithTaxonomyRecordDto[] = yield call(
      DirectoryApi.getSpecialtiesWithTaxonomyRecord,
      payload.categoryId
    );

    yield put(
      getSpecialtiesByCategorySuccess({
        specialties
      })
    );
  } catch (error) {
    console.log(error);
  }
}

function* createProfileRequestSaga() {
  const state: CreateProviderState = yield select(createProviderStateSelector);

  const provider = pick(
    state.data,
    'address',
    'categoryId',
    'name',
    'specialtyIds',
    'isIndividual',
    'phone',
    'email',
    'regionId',
    'geoPoint',
    'npi'
  ) as CreateProviderRequestDto;

  try {
    const response: CreateProviderResponseDto = yield call(
      ProviderApi.createNewProvider,
      {
        ...provider,
        nameInternational: provider.name
      }
    );

    if (response.providerId) {
      yield put(
        createProfileSuccess({
          providerId: response.providerId
        })
      );
    }
  } catch (error) {}
}

export function* changeNPIRequestSaga({ payload }: ChangeNPIRequestAction) {
  const { npi } = payload;

  try {
    yield put(checkExistsProvidersRequest());

    const response: ExistProviderResponseDto = yield call(
      ProviderApi.existProviderByNPIOnlyHealthCare,
      npi
    );
    if (response?.exist && response.ids) {
      yield put(
        providerAlreadyExists({
          providerIds: response.ids
        })
      );

      yield put(
        getExistsProvidersInfoRequest({
          providerIds: response.ids
        })
      );
    }

    yield put(checkExistsProvidersSuccess());
  } catch (error) {
    console.log(error);
  }
}

function* getExistsProvidersInfoRequestSaga({
  payload
}: GetExistsProvidersInfoRequestAction) {
  const { providerIds } = payload;
  try {
    for (let i = 0; providerIds.length > i; i++) {
      const providerInfo: ProfileProviderDto = yield call(
        ProviderApi.getOneById,
        providerIds[i]
      );

      if (providerInfo.activeProfileId && providerInfo.id) {
        const activeProfile: ProviderProfileDto = yield call(
          ProviderApi.getProfile,
          providerInfo.activeProfileId,
          providerInfo.id
        );

        yield put(
          setExistsProviderInfo({
            providerInfo: {
              ...providerInfo,
              activeProfile
            }
          })
        );
      } else {
        yield put(
          setExistsProviderInfo({
            providerInfo: {
              ...providerInfo,
              activeProfile: null
            }
          })
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
}

function* changeProviderNameSaga({ payload }: ChangeProviderNameAction) {
  yield put(getSimilarNameProviderProfilesRequest(payload));
}

function* getSimilarNameProviderProfilesRequestSaga({
  payload
}: GetSimilarNameProfilesRequestAction) {
  const { name } = payload;
  const { lat, lng }: ProfileGeoCoordinateDto = yield select(
    createProviderLocationSelector
  );

  if (lat && lng) {
    try {
      const response: SearchHintResponse = yield call(SearchApi.searchProvider, {
        queryText: name,
        lng,
        lat,

        count: 10
      });

      for (let i = 0; response?.items?.length > i; i++) {
        const profileId = response?.items[i]?.profileId;

        const providerId = response?.items[i]?.providerId;
        const profile: ProviderProfileDto = yield call(
          ProviderApi.getProfile,
          profileId,
          providerId
        );
        yield put(
          getSimilarNameProviderProfileSuccess({
            profile
          })
        );
      }
      yield put(getAllSimilarNameProviderProfilesSuccess());
    } catch (error) {}
  }
}

export function* createProviderRootSaga() {
  yield takeEvery(setLocationRequest.type, setLocationRequestSaga);
  yield takeEvery(setCategory.type, setCategorySaga);
  yield takeEvery(
    getSpecialtiesByCategoryRequest.type,
    getSpecialtiesByCategoryRequestSaga
  );
  yield takeLatest(createProfileRequest.type, createProfileRequestSaga);

  yield debounce(DEBOUNCE_VALUE, changeNPIRequest.type, changeNPIRequestSaga);

  yield takeEvery(
    getExistsProvidersInfoRequest.type,
    getExistsProvidersInfoRequestSaga
  );

  yield debounce(DEBOUNCE_VALUE, changeProviderName.type, changeProviderNameSaga);

  yield takeEvery(
    getSimilarNameProviderProfilesRequest.type,
    getSimilarNameProviderProfilesRequestSaga
  );
}
