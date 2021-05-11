import { END, EventChannel, eventChannel } from 'redux-saga';
import {
  call,
  fork,
  put,
  select,
  take,
  takeEvery,
  takeLatest
} from 'redux-saga/effects';

import { ACCEPT_IMAGE_FILE_TYPE, MAX_IMAGE_FILE_SIZE } from 'config/files';
import { ProviderApi } from 'features/provider/services';
import EditProviderApi from 'features/provider/services/EditProviderApi';
import { ProviderDto } from 'features/provider/types/dto/ProviderDto';
import { ProfileGalleryModel } from 'features/provider/types/models/EditProviderProfile';
import { FilesApi } from 'shared/services';
import { FileErrorTypes } from 'shared/types/error/error-types';
import {
  EditProviderProfileDto,
  ProfileGalleryDto,
  ProfileProfileAttributesDto
} from 'shared/types/generate';
import { isFileSizeLessThan, isFileTypes } from 'shared/utils/file';

import {
  DeletePhotoRequestAction,
  LoadProviderPhotosRequestAction,
  UpdatePhotosRequestAction,
  UploadPhotosRequestAction
} from './actionTypes';
import {
  ProviderEditPhotoState,
  closeUploadPhotoModal,
  deletePhotoRequest,
  loadProviderPhotosError,
  loadProviderPhotosRequest,
  loadProviderPhotosSuccess,
  updatePhotosError,
  updatePhotosRequest,
  updatePhotosSuccess,
  uploadPhotoReject,
  uploadPhotosError,
  uploadPhotosProgress,
  uploadPhotosRequest,
  uploadPhotosSuccess
} from './providerPhotosSlice';
import {
  providerEditPhotoGallerySelector,
  providerEditPhotoStateSelector
} from './selectors';

function createUploader(file: File, i: number, totalFiles: number) {
  let emit: any;
  const chan = eventChannel(emitter => {
    emit = emitter;
    return () => {};
  });
  const uploadProgressCb = ({
    total,
    loaded
  }: {
    total: number;
    loaded: number;
  }) => {
    const percentage = Math.round(((loaded * 100) / total / totalFiles) * i);

    emit(percentage);
    if (percentage === 100) emit(END);
  };
  const uploadPromise = FilesApi.uploadOne(file, uploadProgressCb);
  return [uploadPromise, chan];
}

function* uploadProgressWatcher(chan: EventChannel<unknown>) {
  while (true) {
    const progress: number = yield take(chan);
    yield put(uploadPhotosProgress({ progress }));
  }
}

function* loadProviderPhotosRequestSaga({
  payload
}: LoadProviderPhotosRequestAction) {
  const providerId = payload.providerId;
  const provider: ProviderDto = yield call(
    ProviderApi.getOneById,
    payload.providerId
  );

  const profileId = provider?.activeProfileId;

  try {
    if (profileId && providerId) {
      const data: EditProviderProfileDto = yield call(
        EditProviderApi.getProfile,
        profileId,
        providerId
      );

      yield put(
        loadProviderPhotosSuccess({
          data
        })
      );
    }
  } catch (error) {
    yield put(
      loadProviderPhotosError({
        message: error.message
      })
    );
  }
}

function* saveCurrentProfileDataSaga(data: ProfileProfileAttributesDto) {
  const state: ProviderEditPhotoState = yield select(providerEditPhotoStateSelector);

  const profile = state?.data?.profile;
  const profileId = state.data?.profileId;
  const providerId = state.data?.providerId;
  const name = profile?.name;
  const mainUnitId = profile?.mainUnitId;

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
}

function* uploadPhotosRequestSaga({ payload }: UploadPhotosRequestAction) {
  try {
    const state: ProviderEditPhotoState = yield select(
      providerEditPhotoStateSelector
    );
    const stateGallery = state.data.profile?.gallery || [];

    const lastGalleryItemIndex = stateGallery.length;

    const files = payload.files;
    let newItemsGallery: ProfileGalleryDto[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      let fileError = false;

      if (!isFileTypes(file, ACCEPT_IMAGE_FILE_TYPE)) {
        fileError = true;

        yield put(
          uploadPhotoReject({
            fileName: file.name,
            errorType: FileErrorTypes.INVALID_FILE_TYPE
          })
        );
      }
      if (!isFileSizeLessThan(file, MAX_IMAGE_FILE_SIZE)) {
        fileError = true;

        yield put(
          uploadPhotoReject({
            fileName: file.name,
            errorType: FileErrorTypes.MAX_FILE_SIZE
          })
        );
      }

      if (!fileError) {
        const [uploadPromise, chan]: [
          Promise<string>,
          EventChannel<unknown>
        ] = yield call(createUploader, files[i], i + 1, files.length);

        yield fork(uploadProgressWatcher, chan);
        const photoUrl: string = yield call(() => uploadPromise);

        newItemsGallery.push({
          index: lastGalleryItemIndex + i,
          photoUrl,
          alt: ''
        });
      }
    }

    const gallery = stateGallery.concat(newItemsGallery);

    yield put(
      uploadPhotosSuccess({
        gallery
      })
    );

    yield put(
      updatePhotosRequest({
        gallery
      })
    );

    yield put(closeUploadPhotoModal());
  } catch (error) {
    yield put(
      uploadPhotosError({
        message: error.message
      })
    );
  }
}

function* updatePhotosRequestSaga({ payload }: UpdatePhotosRequestAction) {
  const gallery = payload.gallery;
  try {
    yield call(saveCurrentProfileDataSaga, {
      gallery
    });

    yield put(updatePhotosSuccess());
  } catch (error) {
    yield put(
      updatePhotosError({
        message: error.message
      })
    );
    console.log(error);
  }
}

function* deletePhotoRequestSaga({ payload }: DeletePhotoRequestAction) {
  const deleteIndex = payload.index;
  const stateGallery: ProfileGalleryModel[] = yield select(
    providerEditPhotoGallerySelector
  );
  const gallery = stateGallery.filter(item => item?.index !== deleteIndex);

  yield put(
    uploadPhotosSuccess({
      gallery
    })
  );

  yield put(
    updatePhotosRequest({
      gallery
    })
  );
}

export function* providerEditPhotoRootSaga() {
  yield takeLatest(loadProviderPhotosRequest.type, loadProviderPhotosRequestSaga);
  yield takeEvery(uploadPhotosRequest.type, uploadPhotosRequestSaga);
  yield takeEvery(updatePhotosRequest.type, updatePhotosRequestSaga);
  yield takeEvery(deletePhotoRequest.type, deletePhotoRequestSaga);
}
