import {
  LanguageSimpleRecordDto,
  ProvidersCategoryRecordDto
} from 'shared/types/generate';

export type DirectoryData = {
  simpleLanguages: LanguageSimpleRecordDto[];
  categories: ProvidersCategoryRecordDto[];
};
