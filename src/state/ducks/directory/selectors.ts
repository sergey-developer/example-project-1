import { DirectoryState, name as reducerName } from './directorySlice';

export const directoryStateSelector = (state: any): DirectoryState =>
  state[reducerName];

export const directorySimpleLanguagesSelector = (state: any) =>
  directoryStateSelector(state).data?.simpleLanguages;

export const directoryCategoryListSelector = (state: any) =>
  directoryStateSelector(state).data?.categories;
