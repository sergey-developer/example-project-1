import api from 'config/api';
import env from 'config/env';

import { qs } from '../utils';

class BaseReviewsApi {
  protected readonly api: typeof api;
  protected readonly basePath: string;

  protected generatePath = (
    subPath: string,
    objToQueryString?: Record<string, any>
  ): string => {
    return `${this.basePath}/${subPath}${
      objToQueryString ? qs(objToQueryString) : ''
    }`;
  };

  protected constructor() {
    this.api = api;
    this.basePath = env.get('baseReviewApiUrl') as string;
  }
}

export default BaseReviewsApi;
