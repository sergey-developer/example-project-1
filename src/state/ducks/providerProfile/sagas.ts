import { call, debounce, fork, put, select, takeLatest } from 'redux-saga/effects';

import { ProviderApi } from 'features/provider/services';
import EditProviderApi from 'features/provider/services/EditProviderApi';
import {
  InsuranceWithSubdivisions,
  ProviderDto,
  ProviderProfileDto,
  ProviderProfileInsurance
} from 'features/provider/types';
import { DirectoryApi, FilesApi } from 'shared/services';
import { CategoryDto } from 'shared/types/dto/CategoryDto';
import { SpecialtyDto } from 'shared/types/dto/SpecialtyDto';
import {
  EditProviderProfileDto,
  ProfileProfileAttributesDto
} from 'shared/types/generate';
import { pick } from 'shared/utils/pick';

import { getInsurancesByCategoryIdRequest } from '../insuranceWithSubdivisions';
import { getSpecialtiesByCategoryIdRequest } from '../specialtyWithTaxonomy';
import {
  ChangeEducationAction,
  ChangeSelectInsurancesAction,
  ChangeSelectSpecialitiesAction,
  ChangeTextFieldAction,
  UploadAwardImageAction,
  UploadEducationImageAction,
  UploadServiceImageAction
} from './actionTypes';
import {
  ChangeAvatarStart,
  GetActiveProfile,
  GetProviderProfileAction,
  ProviderProfileState,
  changeAvatarStart,
  changeAvatarSuccess,
  changeEducation,
  changeSelectInsurances,
  changeSelectSpecialities,
  changeTextFieldValue,
  doGetActiveProfile,
  doGetProviderProfile,
  getInsurancesInProfile,
  getInsurancesInProfileError,
  getInsurancesInProfileSuccess,
  getProviderProfileError,
  getProviderProfileSuccess,
  providerProfileLoading,
  updateAwardProtoUrl,
  updateEducationPhotoUrl,
  updateEnd,
  updateError,
  updateServiceImageUrl,
  updateStart,
  uploadAwardImage,
  uploadEducationImage,
  uploadServiceImage
} from './providerProfileSlice';
import { providerProfileSelector } from './selectors';

function* saveProfileDataSaga(
  providerId: string,
  profileId: string,
  data: ProfileProfileAttributesDto
) {
  try {
    const response: EditProviderProfileDto = yield call(
      EditProviderApi.updateProfile,
      providerId,
      profileId,
      {
        name: 'testName',
        mainUnitId: '602e9225497ff9763fb3c931',
        ...data
      }
    );

    return response;
  } catch (error) {
    console.error(error);
  }
}

function* saveCurrentProfileDataSaga(data: ProfileProfileAttributesDto) {
  const profileState: ProviderProfileState = yield select(providerProfileSelector);
  const profileId = profileState?.data?.id;
  const providerId = profileState?.data?.providerId;
  const name = profileState?.data?.name;
  const mainUnitId = profileState?.data?.mainUnitId;

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

function* getInsurancesInProfileSaga() {
  const providerProfile: ProviderProfileState = yield select(
    providerProfileSelector
  );
  try {
    if (providerProfile.data?.healthcare?.insurances) {
      let profileInsurances = providerProfile.data?.healthcare?.insurances;

      let newProfileInsurances: ProviderProfileInsurance[] = [];
      for (let i = 0; profileInsurances.length > i; i++) {
        const insuranceId = profileInsurances[i].insuranceId;
        const insuranceSubdivisionId = profileInsurances[i].subdivisionId;

        if (insuranceId) {
          const insurance: InsuranceWithSubdivisions = yield call(
            DirectoryApi.getInsuranceById,
            insuranceId
          );

          newProfileInsurances[i] = {
            ...profileInsurances[i],
            insuranceName: insurance.insurance.name,
            subdivisionName: insurance.insuranceSubdivision?.find(
              item => item.id === insuranceSubdivisionId
            )?.name
          };
        }
      }

      yield put(getInsurancesInProfileSuccess(newProfileInsurances));
    }
  } catch (error) {
    yield put(getInsurancesInProfileError(error.message));
  }
}

function* getProviderProfile({ payload }: GetProviderProfileAction) {
  yield put(providerProfileLoading('pending'));
  try {
    const providerProfile: ProviderProfileDto = yield call(
      ProviderApi.getProfile,
      payload.profileId,
      payload.providerId
    );

    const { categoryId, specialtyIds, ...rest } = providerProfile;

    const category: CategoryDto = yield call(
      DirectoryApi.getOneCategoryById,
      categoryId
    );

    let specialties: SpecialtyDto[] = [];

    if (specialtyIds && specialtyIds.length) {
      specialties = yield call(DirectoryApi.getSpecialtiesByIds, specialtyIds);
    }

    yield put(
      getProviderProfileSuccess({
        ...rest,
        specialties,
        category
      })
    );

    yield put(
      getSpecialtiesByCategoryIdRequest({
        categoryId
      })
    );

    const isHealthcare = rest.healthcare;
    if (isHealthcare) {
      yield put(
        getInsurancesByCategoryIdRequest({
          categoryId
        })
      );

      if (isHealthcare) {
        yield put(getInsurancesInProfile());
      }
    }
  } catch (error) {
    yield put(getProviderProfileError(error.message));
  }
}

function* getActiveProfile({ payload }: GetActiveProfile) {
  yield put(providerProfileLoading('pending'));

  try {
    // TODO: get provider from store
    const provider: ProviderDto = yield call(
      ProviderApi.getOneById,
      payload.providerId
    );

    const profileId = provider?.activeProfileId;

    yield put(
      doGetProviderProfile({
        profileId,
        providerId: payload.providerId
      })
    );
  } catch (error) {
    yield put(getProviderProfileError(error.message));
  }
}

function* uploadImage(file: File) {
  try {
    yield put(updateStart());
    const url: string = yield call(FilesApi.uploadOne, file);
    yield put(updateEnd());
    return url;
  } catch (error) {
    yield put(updateError(error.message));
  }
}

function* changeAvatarSaga({ payload }: ChangeAvatarStart) {
  try {
    const providerProfile: ProviderProfileState = yield select(
      providerProfileSelector
    );

    const providerId = providerProfile.data?.providerId;
    const profileId = providerProfile.data?.id;

    const photoUrl: string = yield call(uploadImage, payload.file);

    if (providerId && profileId) {
      yield fork(saveProfileDataSaga, providerId, profileId, {
        photoUrl
      });
    }

    yield put(
      changeAvatarSuccess({
        photoUrl
      })
    );
  } catch (error) {}
}

function* uploadServiceImageSaga({ payload }: UploadServiceImageAction) {
  const { index, file } = payload;

  const imageUrl: string = yield call(uploadImage, file);

  yield put(
    updateServiceImageUrl({
      index,
      imageUrl
    })
  );
}

function* uploadAwardImageSaga({ payload }: UploadAwardImageAction) {
  const { index, file } = payload;
  const photoUrl: string = yield call(uploadImage, file);
  yield put(updateAwardProtoUrl({ index, photoUrl }));
}

function* uploadEducationImageSaga({ payload }: UploadEducationImageAction) {
  const { index, file } = payload;
  const photoUrl: string = yield call(uploadImage, file);
  yield put(updateEducationPhotoUrl({ photoUrl, index }));
}

function* changeTextFieldValueSaga({ payload }: ChangeTextFieldAction) {
  yield call(saveCurrentProfileDataSaga, payload);
}

function* changeSelectSpecialitiesSaga({ payload }: ChangeSelectSpecialitiesAction) {
  yield call(saveCurrentProfileDataSaga, {
    specialtyIds: payload.specialties.map(item => item.id)
  });
}

function* changeSelectInsurancesSaga({ payload }: ChangeSelectInsurancesAction) {
  yield call(saveCurrentProfileDataSaga, {
    healthcare: {
      insurances: payload.insurances.map(item =>
        pick(item, 'insuranceId', 'subdivisionId')
      )
    }
  });
}

function* changeEducationSaga({ payload }: ChangeEducationAction) {
  // yield call(saveCurrentProfileDataSaga, {
  //   education
  // });
}

export function* getProviderProfileSaga() {
  yield takeLatest(doGetProviderProfile.type, getProviderProfile);
  yield takeLatest(doGetActiveProfile.type, getActiveProfile);
  yield takeLatest(getInsurancesInProfile.type, getInsurancesInProfileSaga);
  yield takeLatest(changeAvatarStart.type, changeAvatarSaga);
  yield takeLatest(uploadServiceImage.type, uploadServiceImageSaga);
  yield takeLatest(uploadAwardImage.type, uploadAwardImageSaga);
  yield takeLatest(uploadEducationImage.type, uploadEducationImageSaga);
  yield debounce(1000, changeTextFieldValue.type, changeTextFieldValueSaga);

  yield takeLatest(changeSelectSpecialities.type, changeSelectSpecialitiesSaga);
  yield takeLatest(changeSelectInsurances.type, changeSelectInsurancesSaga);
  yield debounce(1000, changeEducation.type, changeEducationSaga);
}
