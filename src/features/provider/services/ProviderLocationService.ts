import EditProviderApi from './EditProviderApi';

class ProviderLocationService {
  private static instance: ProviderLocationService;

  public static getInstance(): ProviderLocationService {
    if (!ProviderLocationService.instance) {
      ProviderLocationService.instance = new ProviderLocationService();
    }

    return ProviderLocationService.instance;
  }

  private constructor() {}

  public setAsMain = async (
    providerId: string,
    profileId: string,
    mainUnitId: string
  ): Promise<boolean> => {
    try {
      await EditProviderApi.updateProfile(providerId, profileId, { mainUnitId });

      return true;
    } catch (error) {
      throw error;
      // TODO: handle error
    }
  };
}

export default ProviderLocationService.getInstance();
