import {
  EditProviderStatusEnum,
  ProfileEditProviderModel
} from 'features/provider/types/models/EditProviderProfile';

export const defaultState: ProfileEditProviderModel = {
  profile: {
    legal: {
      bankAddress: '',
      bankName: '',
      swift: '',
      accountNumber: '',
      routingNumber: '',
      accountHolderNmae: ''
    }
  },
  providerStatus: EditProviderStatusEnum.Pristine
};
