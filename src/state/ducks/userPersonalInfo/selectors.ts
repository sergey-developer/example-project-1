import { UserPersonalInfoModel } from 'features/user/types';

import { RootState } from '../../store';
import {
  EditUserPersonalInfoState,
  UserPersonalInfoState
} from './userPersonalInfoSlice';

const userPersonalInfoStateSelector = (state: RootState): UserPersonalInfoState =>
  state.userPersonalInfo.info;

const userPersonalInfoDataSelector = (
  state: RootState
): UserPersonalInfoState['data'] => state.userPersonalInfo.info.data;

const userPersonalInfoLoadingSelector = (
  state: RootState
): UserPersonalInfoState['loading'] => state.userPersonalInfo.info.loading;

const userPersonalInfoAvatarLoadingSelector = (
  state: RootState
): EditUserPersonalInfoState['avatarLoading'] =>
  state.userPersonalInfo.edit.avatarLoading;

const userPersonalInfoAvatarSelector = (
  state: RootState
): UserPersonalInfoModel['avatarUrl'] | undefined =>
  state.userPersonalInfo.info.data?.avatarUrl;

const userPersonalInfoFullNameSelector = (
  state: RootState
): UserPersonalInfoModel['fullName'] | undefined =>
  state.userPersonalInfo.info.data?.fullName;

export {
  userPersonalInfoDataSelector,
  userPersonalInfoStateSelector,
  userPersonalInfoLoadingSelector,
  userPersonalInfoAvatarLoadingSelector,
  userPersonalInfoAvatarSelector,
  userPersonalInfoFullNameSelector
};
