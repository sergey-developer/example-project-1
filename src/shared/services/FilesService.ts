import FilesApi from './FilesApi';

interface IFilesService {
  extractFilePath: (absolutePath: string) => string;
}

class FilesService implements IFilesService {
  private static instance: FilesService;

  public static getInstance(): FilesService {
    if (!FilesService.instance) {
      FilesService.instance = new FilesService();
    }

    return FilesService.instance;
  }

  private constructor() {}

  public extractFilePath = (absolutePath: string): string => {
    const pathArr = absolutePath.split(`${FilesApi.basePath}/`);
    const filePath = pathArr[pathArr.length - 1];
    return filePath;
  };
}

export default FilesService.getInstance();
