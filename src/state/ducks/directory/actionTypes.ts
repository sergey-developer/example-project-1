import { PayloadAction } from '@reduxjs/toolkit';

import {
  LanguageSimpleRecordDto,
  ProvidersCategoryRecordDto
} from 'shared/types/generate';

export type GetSimpleLanguagesSuccessPayload = {
  simpleLanguages: LanguageSimpleRecordDto[];
};

export type GetSimpleLanguagesSuccessAction = PayloadAction<GetSimpleLanguagesSuccessPayload>;

export type GetCategoryListSuccessPayload = {
  categories: ProvidersCategoryRecordDto[];
};

export type GetCategoryListSuccessAction = PayloadAction<GetCategoryListSuccessPayload>;
