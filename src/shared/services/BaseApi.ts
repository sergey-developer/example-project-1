import api from 'config/api';

class BaseApi {
  protected generatePath(subPath?: string, apiVersion: string = 'v1'): string {
    const basePath = `${this.baseUrl}/api/${apiVersion}/${this.servicePath}`;

    return subPath ? `${basePath}/${subPath}` : basePath;
  }

  protected api: typeof api;

  protected constructor(
    private readonly baseUrl: string,
    private readonly servicePath: string
  ) {
    this.api = api;
  }
}

export default BaseApi;
