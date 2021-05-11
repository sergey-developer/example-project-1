import { PayloadAction, combineReducers, createSlice } from '@reduxjs/toolkit';

import {
  EditUserPersonalInfoModel,
  UserPersonalInfoModel
} from 'features/user/types';
import { ErrorAction, LoadingAction, LoadingStatus, Nullable } from 'shared/types';

export type EditUserPersonalInfoState = {
  loading: LoadingStatus;
  avatarLoading: LoadingStatus;
  errors: Partial<Record<keyof UserPersonalInfoModel, string>>;
};

export type UploadAvatarAction = PayloadAction<Blob>;

export type DeleteAvatarAction = PayloadAction<string>;

const editUserPersonalInfoInitialState = {
  loading: 'idle',
  avatarLoading: 'idle',
  errors: {}
} as EditUserPersonalInfoState;

const editUserPersonalInfoSlice = createSlice({
  name: 'editUserPersonalInfo',
  initialState: editUserPersonalInfoInitialState,
  reducers: {
    editUserPersonalInfo(state, action: PayloadAction<EditUserPersonalInfoModel>) {},
    editUserPersonalInfoLoading(state, action: LoadingAction) {
      state.loading = action.payload;
    },
    editUserPersonalInfoSuccess(state) {
      state.loading = 'finished';
    },
    editUserPersonalInfoError(
      state,
      action: PayloadAction<EditUserPersonalInfoState['errors']>
    ) {
      state.loading = 'finished';
      state.errors = action.payload;
    },
    uploadAvatar(state, action: UploadAvatarAction) {},
    deleteAvatar(state, action: DeleteAvatarAction) {},
    avatarLoading(state, action: LoadingAction) {
      state.avatarLoading = action.payload;
    },
    avatarHandledSuccess(state) {
      state.avatarLoading = 'finished';
      state.errors.avatarUrl = undefined;
    },
    avatarHandledError(state, action: ErrorAction) {
      state.avatarLoading = 'finished';
      state.errors.avatarUrl = action.payload;
    }
  }
});

export type UserPersonalInfoState = {
  data: Nullable<UserPersonalInfoModel>;
  loading: LoadingStatus;
  error: Nullable<string>;
};

const personalInfoInitialState = {
  data: null,
  loading: 'idle',
  error: null
} as UserPersonalInfoState;

const userPersonalInfoSlice = createSlice({
  name: 'userPersonalInfo',
  initialState: personalInfoInitialState,
  reducers: {
    doGetUserPersonalInfo() {},
    getPersonalInfoLoading(state, action: LoadingAction) {
      state.loading = action.payload;
    },
    getPersonalInfoSuccess(state, action: PayloadAction<UserPersonalInfoModel>) {
      state.data = action.payload;
      state.loading = 'finished';
      state.error = null;
    },
    getPersonalInfoError(state, action: ErrorAction) {
      state.data = null;
      state.loading = 'finished';
      state.error = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(
      editUserPersonalInfoSlice.actions.editUserPersonalInfo,
      (state, action) => {
        if (state.data) {
          state.data = { ...state.data, ...action.payload };
        }
      }
    );
  }
});

const reducer = combineReducers({
  info: userPersonalInfoSlice.reducer,
  edit: editUserPersonalInfoSlice.reducer
});

export default reducer;

export const name = userPersonalInfoSlice.name;

export const {
  doGetUserPersonalInfo,
  getPersonalInfoLoading,
  getPersonalInfoSuccess,
  getPersonalInfoError
} = userPersonalInfoSlice.actions;

export const {
  editUserPersonalInfo,
  editUserPersonalInfoLoading,
  editUserPersonalInfoSuccess,
  editUserPersonalInfoError,
  uploadAvatar,
  deleteAvatar,
  avatarLoading,
  avatarHandledSuccess,
  avatarHandledError
} = editUserPersonalInfoSlice.actions;
