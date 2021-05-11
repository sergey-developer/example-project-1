import api from 'config/api';
import env from 'config/env';
import { OidcUserModel } from 'features/auth/types';

interface IFilesApi {
  basePath: string;
  uploadOne: (file: File) => Promise<string>;
  getOne: (
    userId: OidcUserModel['profile']['sub'],
    fileName: string
  ) => Promise<string>;
  deleteOne: (filePath: string) => Promise<boolean>;
}

class FilesApi implements IFilesApi {
  private static instance: FilesApi;

  public static getInstance(): FilesApi {
    if (!FilesApi.instance) {
      FilesApi.instance = new FilesApi();
    }

    return FilesApi.instance;
  }

  private readonly api: typeof api;

  private generatePath = (subPath?: string): string => {
    return subPath ? `${this.basePath}/${subPath}` : this.basePath;
  };

  private constructor() {
    this.api = api;
    const baseUrl = env.get('baseFilesApiUrl') as string;

    this.basePath = `${baseUrl}/File`;
  }

  public readonly basePath: string;

  public uploadOne = async (
    file: File | Blob,
    onUploadProgress?: (progressEvent: any) => void
  ): Promise<string> => {
    try {
      const url = this.generatePath();

      const formData = new FormData();
      formData.append('file', file);

      const headers = {
        'Content-Type': 'multipart/form-data'
      };

      const response = await this.api.post<string>(url, formData, {
        headers,
        onUploadProgress
      });

      const fileUri = response.data;
      const src = `${url}/${fileUri}`;

      return src;
    } catch (error) {
      throw new Error('Upload file error');
    }
  };

  public getOne = async (
    userId: OidcUserModel['profile']['sub'],
    fileName: string
  ): Promise<string> => {
    try {
      const url = this.generatePath(`${userId}/${fileName}`);
      const response = await this.api.get<string>(url);
      const src = response.data;

      return src;
    } catch (error) {
      throw new Error('Get file error');
    }
  };

  public deleteOne = async (filePath: string): Promise<boolean> => {
    try {
      const url = this.generatePath();
      const response = await this.api.delete<string>(`${url}?filePath=${filePath}`);

      return !!response.data;
    } catch (error) {
      throw new Error('Delete file error');
    }
  };
}

export default FilesApi.getInstance();
