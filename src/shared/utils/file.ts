export const isFileTypes = (file: File, fileTypes: string[]) => {
  return fileTypes.includes(file.type);
};

export const isFileSizeLessThan = (file: File, size: number) => {
  return file.size < size;
};
