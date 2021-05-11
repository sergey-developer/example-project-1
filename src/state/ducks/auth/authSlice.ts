import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { History } from 'history';

import { OidcUserModel, OidcUserStateModel } from 'features/auth/types';
import { ErrorAction, LoadingAction, LoadingStatus, Nullable } from 'shared/types';

export type AuthState = {
  user: Nullable<OidcUserModel>;
  loading: LoadingStatus;
  error: Nullable<string>;
};

export type SigninAction = PayloadAction<OidcUserStateModel>;

export type FinishSigninAction = PayloadAction<{ history: History }>;

export const authInitialState = {
  user: null,
  loading: 'idle',
  error: null
} as AuthState;

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    doSignin(state, action: SigninAction) {},
    doStartSignin(state, action: SigninAction) {},
    doFinishSignin(state, action: FinishSigninAction) {},
    doSignOut() {},
    authLoading(state, action: LoadingAction) {
      state.user = null;
      state.loading = action.payload;
      state.error = null;
    },
    authSetUser(state, action: PayloadAction<Nullable<OidcUserModel>>) {
      state.user = action.payload;
      state.loading = 'finished';
      state.error = null;
    },
    authError(state, action: ErrorAction) {
      state.user = null;
      state.loading = 'finished';
      state.error = action.payload;
    }
  }
});

export const { name } = authSlice;

export const {
  doSignin,
  doStartSignin,
  doFinishSignin,
  doSignOut,
  authLoading,
  authSetUser,
  authError
} = authSlice.actions;

export default authSlice.reducer;
