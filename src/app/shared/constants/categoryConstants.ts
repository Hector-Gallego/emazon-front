export const CategoryErrorMessages = {
    REQUIERED_ERROR_MESSAGE: 'Este campo es obligatorio.',
    MAX_LENGTH_ERROR_MESSAGE: (maxLength: number) => `Máximo ${maxLength} caracteres permitidos.`,
  };
  
  export const FieldLimits = {
    MAX_LENGTH_CATEGORY_NAME_FIELD: 50,
    MAX_LENGTH_CATEGORY_DESCRIPTION_FIELD: 90,
  };

  export const CategoryValuesConstants = {
    END_POINT_CATEGORY  : '/api/category',
  }