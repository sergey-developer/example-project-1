import { PayloadAction } from '@reduxjs/toolkit';

import { SidebarIconNames } from 'components/Icons/SidebarIcon';

export type Nullable<T> = T | null;

export type ValueOf<T> = T[keyof T];

export type LoadingStatus = 'idle' | 'pending' | 'finished';

export type UpdateStatus = 'update' | 'idle';

export type LoadingAction = PayloadAction<LoadingStatus>;

export type ErrorAction = PayloadAction<string>;

export type SidebarNavItem = {
  icon?: SidebarIconNames;
  to: string;
  label: string;
  soon?: boolean;
};
