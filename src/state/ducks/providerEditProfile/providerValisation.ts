import * as Yup from 'yup';

import i18n from 'config/i18n';
import { ProfileEditProviderModel } from 'features/provider/types/models';

const t = (key: string, options?: any) =>
  i18n.t(`errors:profilePublishErrors.${key}`, options);

const MIN_NAME_LENGTH = 3;

const MIN_OVERVIEW_LENGTH = 20;

const MIN_SERVICE_NAME_LENGTH = 3;

const MIN_SERVICE_DESCRIPTION_LENGTH = 10;

const MIN_EDUCATION_DEGREE_LENGTH = 2;

const MIN_EDUCATION_SCHOOL_NAME_LENGTH = 5;

const MIN_YEAR = 1899;

const MAX_YEAR = new Date().getFullYear();

const MIN_AWARDS_NAME_LENGTH = 5;

const MIN_AFFILIATE_NAME_LENGTH = 3;

export enum ProfileValidateError {
  NAME_NOT_FULL = 'NAME_NOT_FULL',
  OVERVIEW_NOT_FULL = 'OVERVIEW_NOT_FULL',
  SERVICE_NAME_NOT_FULL = 'SERVICE_NAME_NOT_FULL',
  SERVICE_DESCRIPTION_NOT_FULL = 'SERVICE_DESCRIPTION_NOT_FULL',
  EDUCATION_DEGREE_NOT_FULL = 'EDUCATION_DEGREE_NOT_FULL',
  EDUCATION_SCHOOL_NAME_NOT_FULL = 'EDUCATION_SCHOOL_NAME_NOT_FULL',
  EDUCATION_GRADUATED_YEAR_NOT_VALID = 'EDUCATION_GRADUATED_YEAR_NOT_VALID',
  AWARDS_NAME_NOT_FULL = 'AWARDS_NAME_NOT_FULL',
  AWARDS_YEAR_NOT_VALID = 'AWARDS_YEAR_NOT_VALID',
  AFFILIATE_NAME_NOT_FULL = 'AFFILIATE_NAME_NOT_FULL',
  NEED_ADD_LOCATION = 'NEED_ADD_LOCATION'
}

export type ValidationError = {
  type?: ProfileValidateError;
  message?: string;
};

export type ServicesError = {
  name?: ValidationError;
  description?: ValidationError;
};

export type EducationError = {
  degree?: ValidationError;
  graduated?: ValidationError;
  schoolName?: ValidationError;
};

export type AwardsError = {
  name?: ValidationError;
  year?: ValidationError;
};

export type AffiliateError = {
  name?: ValidationError;
};

export type PublishProfileErrors = {
  name?: ValidationError;
  overview?: ValidationError;
  services?: ServicesError[];
  educationa?: EducationError[];
  awards?: AwardsError[];
  affiliates?: AffiliateError[];
  locations?: ValidationError;
};

const nameValidationSchema = Yup.string().required().min(MIN_NAME_LENGTH);

const overviewValidationSchema = Yup.string().required().min(MIN_OVERVIEW_LENGTH);

const serviceNameValidation = Yup.string().required().min(MIN_SERVICE_NAME_LENGTH);

const serviceDescriptionValidation = Yup.string()
  .required()
  .min(MIN_SERVICE_DESCRIPTION_LENGTH);

const educationDegreeValidation = Yup.string()
  .required()
  .min(MIN_EDUCATION_DEGREE_LENGTH);

const educationSchoolNameValidation = Yup.string()
  .required()
  .min(MIN_EDUCATION_SCHOOL_NAME_LENGTH);

const yearValidation = Yup.number().required().max(MAX_YEAR).min(MIN_YEAR);

const awardsNameValidation = Yup.string().required().min(MIN_AWARDS_NAME_LENGTH);

const affiliateNameValidation = Yup.string()
  .required()
  .min(MIN_AFFILIATE_NAME_LENGTH);

export const profileValidation = (
  profile: ProfileEditProviderModel
): PublishProfileErrors => {
  const errors: PublishProfileErrors = {};

  if (!nameValidationSchema.isValidSync(profile.profile?.name)) {
    errors.name = {
      type: ProfileValidateError.NAME_NOT_FULL,
      message: t(ProfileValidateError.NAME_NOT_FULL, { length: MIN_NAME_LENGTH })
    };
  }

  if (!overviewValidationSchema.isValidSync(profile.profile?.overview)) {
    errors.overview = {
      type: ProfileValidateError.OVERVIEW_NOT_FULL,
      message: t(ProfileValidateError.OVERVIEW_NOT_FULL, {
        length: MIN_OVERVIEW_LENGTH
      })
    };
  }

  profile?.services?.forEach((service, index) => {
    if (!serviceNameValidation.isValidSync(service?.target?.name)) {
      if (!errors.services) {
        errors.services = [];
      }

      errors.services[index] = {
        ...(errors.services[index] || {}),
        name: {
          type: ProfileValidateError.SERVICE_NAME_NOT_FULL,
          message: t(`${ProfileValidateError.SERVICE_NAME_NOT_FULL}`, {
            length: MIN_SERVICE_NAME_LENGTH
          })
        }
      };
    }

    if (!serviceDescriptionValidation.isValidSync(service?.target?.description)) {
      if (!errors.services) {
        errors.services = [];
      }
      errors.services[index] = {
        ...(errors.services[index] || {}),
        description: {
          type: ProfileValidateError.SERVICE_DESCRIPTION_NOT_FULL,
          message: t(`${ProfileValidateError.SERVICE_DESCRIPTION_NOT_FULL}`, {
            length: MIN_SERVICE_DESCRIPTION_LENGTH
          })
        }
      };
    }
  });

  profile?.profile?.education?.forEach((item, index) => {
    if (!educationDegreeValidation.isValidSync(item?.degree)) {
      if (!errors.educationa) {
        errors.educationa = [];
      }

      errors.educationa[index] = {
        ...errors.educationa[index],
        degree: {
          type: ProfileValidateError.EDUCATION_DEGREE_NOT_FULL,
          message: t(ProfileValidateError.EDUCATION_DEGREE_NOT_FULL, {
            length: MIN_EDUCATION_DEGREE_LENGTH
          })
        }
      };
    }

    if (!educationSchoolNameValidation.isValidSync(item?.schoolName)) {
      if (!errors.educationa) {
        errors.educationa = [];
      }
      errors.educationa[index] = {
        ...errors.educationa[index],
        schoolName: {
          type: ProfileValidateError.EDUCATION_SCHOOL_NAME_NOT_FULL,
          message: t(ProfileValidateError.EDUCATION_SCHOOL_NAME_NOT_FULL, {
            length: MIN_EDUCATION_SCHOOL_NAME_LENGTH
          })
        }
      };
    }

    if (!yearValidation.isValidSync(item?.graduated)) {
      if (!errors.educationa) {
        errors.educationa = [];
      }

      errors.educationa[index] = {
        ...errors.educationa[index],
        graduated: {
          type: ProfileValidateError.EDUCATION_GRADUATED_YEAR_NOT_VALID,
          message: t(ProfileValidateError.EDUCATION_GRADUATED_YEAR_NOT_VALID)
        }
      };
    }
  });

  profile?.profile?.awards?.forEach((item, index) => {
    if (!awardsNameValidation.isValidSync(item?.name)) {
      if (!errors.awards) {
        errors.awards = [];
      }

      errors.awards[index] = {
        ...errors.awards[index],
        name: {
          type: ProfileValidateError.AWARDS_NAME_NOT_FULL,
          message: t(ProfileValidateError.AWARDS_NAME_NOT_FULL, {
            length: MIN_AWARDS_NAME_LENGTH
          })
        }
      };
    }

    if (!yearValidation.isValidSync(item?.year)) {
      if (!errors.awards) {
        errors.awards = [];
      }

      errors.awards[index] = {
        ...errors.awards[index],
        year: {
          type: ProfileValidateError.AWARDS_YEAR_NOT_VALID,
          message: t(ProfileValidateError.AWARDS_YEAR_NOT_VALID)
        }
      };
    }
  });

  profile?.profile?.affiliations?.forEach((item, index) => {
    if (!affiliateNameValidation.isValidSync(item?.name)) {
      if (!errors.affiliates) {
        errors.affiliates = [];
      }

      errors.affiliates[index] = {
        ...errors.affiliates[index],
        name: {
          type: ProfileValidateError.AFFILIATE_NAME_NOT_FULL,
          message: t(ProfileValidateError.AFFILIATE_NAME_NOT_FULL, {
            length: MIN_AFFILIATE_NAME_LENGTH
          })
        }
      };
    }
  });

  if (!profile?.locations?.length) {
    errors.locations = {
      type: ProfileValidateError.NEED_ADD_LOCATION
    };
  }

  return errors;
};
