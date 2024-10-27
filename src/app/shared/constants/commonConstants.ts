export const ErrorMessages = {
  GENERIC_ERROR_MESSAGE: 'Ha ocurrido un error, porfavor inténtalo nuevamente.',
  REQUIERED_ERROR_MESSAGE: 'Este campo es obligatorio.',
  INVALID_EMAIL_ERROR_MESSAGE : 'Ingrese un formato de correo correcto',
  INVALID_PHONE_NUMBER_ERROR_MESSAGE : 'El número de celular ingresado es incorrecto',
  INVALID_PASSWORD_ERROR_MESSAGE : 'Ingrese una contraseña correcta: mínimo 8 caracteres, un número y una mayúscula.',
  MAX_LENGTH_ERROR_MESSAGE: (maxLength: number) =>
    `Máximo ${maxLength} caracteres permitidos.`,
  POSITIVE_NUMBER_ERROR_MESSAGE: 'Por favor ingrese un número positivo',
  MIN_SELECTION_ERROR_MESSAGE: (minSelectionLimit: number) =>
    `Debe seleccionar mínimo ${minSelectionLimit} elemento`,
  MAX_SELECTION_ERROR_MESSAGE: (maxSelectionLimit: number) =>
    `Debe seleccionar máximo ${maxSelectionLimit} elemnetos`,
  ONLY_INTEGER_ERROR_MESSAGE: 'Solo se permiten números enteros',
  AGE_ERROR_MESSAGE : 'Debe ser mayor de edad'
} as const;

export enum StatesTypes {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
}
