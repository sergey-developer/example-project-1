import { ProviderProfile } from 'features/provider/types/models/ProviderProfile';

export const defaultState: Partial<ProviderProfile> = {
  id: '1',
  providerId: 'sdfg',
  prevProfileId: 'dshsfdh',
  name: 'Test ProviderName',
  isIndividual: true,
  // photoUrl: 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
  services: [
    {
      name: 'MyTest service',
      description: 'Description about service',
      imageUrl: null
      // imageUrl:
      //   'https://filedn.com/ltOdFv1aqz1YIFhf4gTY8D7/ingus-info/BLOGS/Photography-stocks3/stock-photography-slider.jpg'
    },
    {
      name: 'MyTest service',
      description: 'Description about service',
      imageUrl:
        'https://filedn.com/ltOdFv1aqz1YIFhf4gTY8D7/ingus-info/BLOGS/Photography-stocks3/stock-photography-slider.jpg'
    },
    {
      name: 'MyTest service',
      description: 'Description about service',
      imageUrl:
        'https://filedn.com/ltOdFv1aqz1YIFhf4gTY8D7/ingus-info/BLOGS/Photography-stocks3/stock-photography-slider.jpg'
    }
  ],
  awards: [],
  education: [],
  affiliations: []
};
