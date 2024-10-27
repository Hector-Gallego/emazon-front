export const Regex = {
    IDENTITY_DOCUMENT_REGEX: /^\d+$/,
    PHONE_NUMBER_REGEX: /^\+?\d{1,13}$/,
    EMAIL_REGEX: /^(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/,
    PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/
  };