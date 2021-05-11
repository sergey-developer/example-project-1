import isEmpty from 'lodash.isempty';
import { call, debounce, put, select, takeLatest } from 'redux-saga/effects';

import { DEBOUNCE_VALUE } from 'config/common';
import { ProviderApi } from 'features/provider/services';
import EditProviderApi from 'features/provider/services/EditProviderApi';
import { ProviderDto } from 'features/provider/types/dto';
import {
  ProfileEditElementType,
  ServiceInProfileModel
} from 'features/provider/types/models/EditProviderProfile';
import { DirectoryApi, FilesApi } from 'shared/services';
import { CategoryDto } from 'shared/types/dto/CategoryDto';
import {
  EditProviderProfileDto,
  ProfileProfileAttributesDto
} from 'shared/types/generate';

import { getInsurancesByCategoryIdRequest } from '../insuranceWithSubdivisions';
import { getSpecialtiesByCategoryIdRequest } from '../specialtyWithTaxonomy';
import {
  AvatarUpdateRequestAction,
  ChangeProfileFieldAction,
  CoverImageUpdateRequestAction,
  DeleteProfileServiceAction,
  GetProviderCategoryRequestAction,
  GetProviderProfileRequestAction,
  PublishProviderDiscardRequestAction,
  PublishProviderRequestAction,
  UpdateLegalInfoRequestAction,
  UpdateProfileServiceAction
} from './actionTypes';
import {
  ProviderEditProfileState,
  avatarUpdateError,
  avatarUpdateRequest,
  avatarUpdateSuccess,
  changeProfileField,
  coverImageUpdateRequest,
  coverImageUpdateSuccess,
  createProfileServices,
  deleteProfileService,
  getProviderCategoryRequest,
  getProviderCategorySuccess,
  getProviderProfileError,
  getProviderProfileRequest,
  getProviderProfileSuccess,
  publishProviderDiscardRequest,
  publishProviderDiscardSuccess,
  publishProviderError,
  publishProviderRequest,
  publishProviderSuccess,
  updateLegalInfoRequest,
  updateProfileService
} from './providerEditProfileSlice';
import { profileValidation } from './providerValisation';
import { providerEditProfileStateSelector } from './selectors';

function* saveCurrentProfileDataSaga(data: ProfileProfileAttributesDto) {
  const profileState: ProviderEditProfileState = yield select(
    providerEditProfileStateSelector
  );

  const profile = profileState?.data?.profile;
  const profileId = profileState.data?.profileId;
  const providerId = profileState.data?.providerId;
  const name = profile?.name;
  const mainUnitId = profile?.mainUnitId;

  try {
    if (profileId && providerId) {
      const response: EditProviderProfileDto = yield call(
        EditProviderApi.updateProfile,
        providerId,
        profileId,
        {
          name,
          mainUnitId,
          ...data
        }
      );

      return response;
    }
  } catch (error) {
    console.log(error);
  }
}

function* getProviderProfileRequestSaga({
  payload
}: GetProviderProfileRequestAction) {
  const { providerId } = payload;
  const provider: ProviderDto = yield call(
    ProviderApi.getOneById,
    payload.providerId
  );

  const profileId = provider?.activeProfileId;
  const categoryId = provider?.categoryId;

  try {
    if (profileId && providerId) {
      const data: EditProviderProfileDto = yield call(
        EditProviderApi.getProfile,
        profileId,
        providerId
      );

      yield put(
        getProviderProfileSuccess({
          data
        })
      );

      yield put(getProviderCategoryRequest({ categoryId }));

      yield put(getSpecialtiesByCategoryIdRequest({ categoryId }));

      yield put(getInsurancesByCategoryIdRequest({ categoryId }));
    }
  } catch (error) {
    yield put(
      getProviderProfileError({
        error: error.message
      })
    );
  }
}

function* getProviderCategoryRequestSaga({
  payload
}: GetProviderCategoryRequestAction) {
  const categoryId = payload.categoryId;
  if (categoryId) {
    const category: CategoryDto = yield call(
      DirectoryApi.getOneCategoryById,
      categoryId
    );
    yield put(
      getProviderCategorySuccess({
        category
      })
    );
  }
}

function* changeProfileFieldSaga({ payload }: ChangeProfileFieldAction) {
  yield call(saveCurrentProfileDataSaga, payload);
}

function* createOrUpdateProviderProfileService(service: ServiceInProfileModel) {
  try {
    const profileState: ProviderEditProfileState = yield select(
      providerEditProfileStateSelector
    );
    const providerId = profileState?.data?.providerId;
    const profileId = profileState?.data?.profileId;
    const serviceId = service.id;
    if (profileId && providerId && serviceId) {
      yield call(
        EditProviderApi.createOrUpdateProviderProfileService,
        providerId,
        profileId,
        serviceId,
        service
      );
    }
  } catch (error) {
    console.log(error);
  }
}

function* deleteProviderProfileElement(
  elementType: ProfileEditElementType,
  elementId: string
) {
  const profileState: ProviderEditProfileState = yield select(
    providerEditProfileStateSelector
  );
  const providerId = profileState?.data?.providerId;
  const profileId = profileState?.data?.profileId;

  try {
    if (providerId && profileId) {
      yield call(
        EditProviderApi.deleteProviderProfileElement,
        providerId,
        profileId,
        elementType,
        elementId
      );
    }
  } catch (error) {
    console.log(error);
  }
}

function* createOrUpdateProviderProfileServiceSaga({
  payload
}: UpdateProfileServiceAction) {
  yield call(createOrUpdateProviderProfileService, payload.service);
}

function* deleteProfileServiceSaga({ payload }: DeleteProfileServiceAction) {
  if (payload.service.id) {
    yield call(
      deleteProviderProfileElement,
      ProfileEditElementType.SERVICE,
      payload.service.id
    );
  }
}

function* avatarUpdateRequestSaga({ payload }: AvatarUpdateRequestAction) {
  const file = payload.file;

  try {
    const photoUrl: string = yield call(FilesApi.uploadOne, file);

    yield put(avatarUpdateSuccess());

    yield put(changeProfileField({ photoUrl }));
  } catch (error) {
    yield put(
      avatarUpdateError({
        message: error?.message
      })
    );
  }
}

function* publishProviderRequestSaga({ payload }: PublishProviderRequestAction) {
  const { profileId, providerId } = payload;
  const profile: ProviderEditProfileState = yield select(
    providerEditProfileStateSelector
  );

  try {
    if (profile?.data?.profile) {
      const profileErrors = profileValidation(profile?.data);

      if (isEmpty(profileErrors)) {
        yield call(EditProviderApi.applyAllChanges, providerId, profileId);
        yield put(publishProviderSuccess());
      } else {
        yield put(publishProviderError({ profileErrors }));
      }
    }
  } catch (error) {
    console.log(error);
    // yield put(
    //   publishProviderError({
    //     message: error.message
    //   })
    // );
  }
}

function* publishProviderDiscardRequestSaga({
  payload
}: PublishProviderDiscardRequestAction) {
  const { profileId, providerId } = payload;

  try {
    yield call(EditProviderApi.rejectAllChanges, providerId, profileId);
    yield put(publishProviderDiscardSuccess());
  } catch (error) {
    console.log(error);
  }
}

function* updateLegalInfoRequestSaga({ payload }: UpdateLegalInfoRequestAction) {
  const profileState: ProviderEditProfileState = yield select(
    providerEditProfileStateSelector
  );

  const profile = profileState?.data?.profile;
  const profileId = profileState.data?.profileId;
  const providerId = profileState.data?.providerId;
  const name = profile?.name;
  const mainUnitId = profile?.mainUnitId;
  const legal = profile?.legal;

  try {
    if (profileId && providerId) {
      const response: EditProviderProfileDto = yield call(
        EditProviderApi.updateProfile,
        providerId,
        profileId,
        {
          name,
          mainUnitId,
          legal: {
            ...legal,
            ...payload.legal
          }
        }
      );

      return response;
    }
  } catch (error) {
    console.log(error);
  }
}

function* coverImageUpdateRequestSaga({ payload }: CoverImageUpdateRequestAction) {
  const { file } = payload;

  try {
    const coverImageUrl: string = yield call(FilesApi.uploadOne, file);

    yield call(saveCurrentProfileDataSaga, { coverImageUrl });

    yield put(
      coverImageUpdateSuccess({
        coverImageUrl
      })
    );
  } catch (error) {
    console.log(error);
  }
}

export function* providerEditProfileRootSaga() {
  yield takeLatest(getProviderProfileRequest.type, getProviderProfileRequestSaga);
  yield debounce(DEBOUNCE_VALUE, changeProfileField.type, changeProfileFieldSaga);
  yield takeLatest(getProviderCategoryRequest.type, getProviderCategoryRequestSaga);
  yield takeLatest(
    createProfileServices.type,
    createOrUpdateProviderProfileServiceSaga
  );
  yield debounce(
    DEBOUNCE_VALUE,
    updateProfileService.type,
    createOrUpdateProviderProfileServiceSaga
  );
  yield takeLatest(deleteProfileService.type, deleteProfileServiceSaga);

  yield takeLatest(avatarUpdateRequest.type, avatarUpdateRequestSaga);

  yield takeLatest(publishProviderRequest.type, publishProviderRequestSaga);

  yield takeLatest(
    publishProviderDiscardRequest.type,
    publishProviderDiscardRequestSaga
  );

  yield debounce(
    DEBOUNCE_VALUE,
    updateLegalInfoRequest.type,
    updateLegalInfoRequestSaga
  );

  yield takeLatest(coverImageUpdateRequest.type, coverImageUpdateRequestSaga);
}
