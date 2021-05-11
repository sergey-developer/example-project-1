import { ProviderState, name as reducerName } from './providerSlice';

const providerSelector = (state: any): ProviderState => state[reducerName];

export { providerSelector };
