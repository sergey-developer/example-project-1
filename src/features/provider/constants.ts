const AcceptNewPatientsEnum = {
  0: null,
  1: true,
  2: false
} as const;

const SocialNamesEnum = {
  0: '',
  1: 'facebook',
  2: 'twitter',
  3: 'instagram',
  4: 'email',
  5: 'website',
  6: 'reddit',
  7: 'whatsapp',
  8: 'linkedIn'
} as const;

const SocialIndexEnum = {
  facebook: 1,
  twitter: 2,
  instagram: 3,
  email: 4,
  website: 5,
  reddit: 6,
  whatsapp: 7,
  linkedIn: 8
};

export type SocialNamesType = typeof SocialNamesEnum[keyof typeof SocialNamesEnum];

const weekDays = {
  0: 'Sun',
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat'
} as const;

export { AcceptNewPatientsEnum, SocialNamesEnum, weekDays, SocialIndexEnum };
