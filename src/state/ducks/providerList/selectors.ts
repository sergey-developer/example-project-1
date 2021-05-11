import { ProviderListState, name as reducerName } from './providerListSlice';

const providerListSelector = (state: any): ProviderListState => state[reducerName];

export { providerListSelector };
