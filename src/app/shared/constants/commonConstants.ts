export const ErrorMessages = {
  GENERIC_ERROR_MESSAGE: 'Ha ocurrido un error, porfavor intentalo nuevamente.',
  REQUIERED_ERROR_MESSAGE: 'Este campo es obligatorio.',
  MAX_LENGTH_ERROR_MESSAGE: (maxLength: number) =>
    `Máximo ${maxLength} caracteres permitidos.`,
  POSITIVE_NUMBER_ERROR_MESSAGE: 'Porfavor ingrese un numero positivo',
  MIN_SELECTION_ERROR_MESSAGE: (minSelectionLimit: number) =>
    `Debe seleccionar minimo ${minSelectionLimit} elemento`,
  MAX_SELECTION_ERROR_MESSAGE: (maxSelectionLimit: number) =>
    `Debe seleccionar maximo ${maxSelectionLimit} elemnetos`,
  ONLY_INTEGER_ERROR_MESSAGE: 'Solo se permiten numeros enteros',
} as const;

export enum StatesTypes {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
}
