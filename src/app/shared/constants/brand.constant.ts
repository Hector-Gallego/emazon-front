export const BrandErrorMessages = {
  REQUIERED_ERROR_MESSAGE: 'Este campo es obligatorio.',
  MAX_LENGTH_ERROR_MESSAGE: (maxLength: number) =>
    `Máximo ${maxLength} caracteres permitidos.`,
} as const;

export const FieldLimits = {
  MAX_LENGTH_BRAND_NAME_FIELD: 50,
  MAX_LENGTH_BRAND_DESCRIPTION_FIELD: 120,
};

export const BrandValuesConstants = {
  END_POINT_BRAND: '/api/brand',
} as const;
