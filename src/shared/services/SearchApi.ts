import api from 'config/api';
import {
  SEARCH_SIMILAR_NAMES_RADIUS,
  SEARCH_SIMILAR_NAMES_RADIUS_UNITS
} from 'config/common';
import env from 'config/env';
import { SearchHintResponse, SearchProviderParams } from 'shared/types/model/Search';

class SearchApi {
  private static instance: SearchApi;
  private baseUrl: string;
  protected api: typeof api;

  private constructor() {
    this.baseUrl = (env.get('baseSearchApiUrl') as string) + '/api';
    this.api = api;
  }
  public static getInstance(): SearchApi {
    if (!SearchApi.instance) {
      SearchApi.instance = new SearchApi();
    }

    return SearchApi.instance;
  }

  protected generatePath(subPath: string): string {
    return `${this.baseUrl}/${subPath}`;
  }

  public searchProvider = async (params: SearchProviderParams) => {
    const url = this.generatePath(`hint`);
    const response = await this.api.get<SearchHintResponse>(url, {
      params: {
        ...params,
        mes: SEARCH_SIMILAR_NAMES_RADIUS_UNITS,
        radius: SEARCH_SIMILAR_NAMES_RADIUS
      }
    });

    return response.data;
  };
}

export default SearchApi.getInstance();
