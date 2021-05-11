export type SearchHintItem = {
  providerId: string;
  unitId: string;
  profileId: string;
  locationId: string;
  dist: number;
  ver: number;
};

export type SearchProviderParams = {
  queryText: string;
  lng: number;
  lat: number;
  count: number;
};

export type SearchHintResponse = {
  total: {
    value: number;
    relation: string;
  };
  items: SearchHintItem[];
};
