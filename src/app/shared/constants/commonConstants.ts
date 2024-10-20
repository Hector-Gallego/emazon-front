export const ErrorMessages = {

    GENERIC_ERROR_MESSAGE : 'Ha ocurrido un error, porfavor intentalo nuevamente.',
    REQUIERED_ERROR_MESSAGE: 'Este campo es obligatorio.',
    MAX_LENGTH_ERROR_MESSAGE: (maxLength: number) =>
      `Máximo ${maxLength} caracteres permitidos.`,

} as const;

export enum StatesTypes  {

    SUCCESS = 'success',
    ERROR = 'error',
    WARNING ='warning'

}