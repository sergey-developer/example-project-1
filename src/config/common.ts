import env from 'config/env';

export const DEBOUNCE_VALUE = 1000;

export const SUPPORT_EMAIL = 'support@example-project.com';

export const MAIN_SITE_URL = env.get('mainUrl') as string;

export const SEARCH_SIMILAR_NAMES_RADIUS = 40;

export const SEARCH_SIMILAR_NAMES_RADIUS_UNITS = 'mi';

export const PHONE_INPUT_MASK = '999-99-9999';

export const NPI_INPUT_MASK = '99-99-99-99-99';

export const YEAR_INPUT_MASK = '9999';

export const HEALTHCARE_CATEGORY_ID = 1;
