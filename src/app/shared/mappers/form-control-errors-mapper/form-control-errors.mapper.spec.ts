
import { ErrorMessages } from 'src/app/shared/constants/commonConstants';
import { FormControlErrorsMapper } from './form-control-errors.mapper';

describe('FormControlErrorsMapper', () => {
  it('debería devolver el mensaje de error de campo requerido', () => {
    const control = { touched: true, invalid: true, errors: { required: true } };
    const errorMessage = FormControlErrorsMapper.mapErrorMessage(control, 0, 0);
    expect(errorMessage).toBe(ErrorMessages.REQUIERED_ERROR_MESSAGE);
  });

  it('debería devolver el mensaje de error de longitud máxima', () => {
    const control = { touched: true, invalid: true, errors: { maxlength: { requiredLength: 10 } } };
    const errorMessage = FormControlErrorsMapper.mapErrorMessage(control, 0, 0);
    expect(errorMessage).toBe(ErrorMessages.MAX_LENGTH_ERROR_MESSAGE(10));
  });

  it('debería devolver el mensaje de error de número positivo', () => {
    const control = { touched: true, invalid: true, errors: { min: { min: 1 } } };
    const errorMessage = FormControlErrorsMapper.mapErrorMessage(control, 0, 0);
    expect(errorMessage).toBe(ErrorMessages.POSITIVE_NUMBER_ERROR_MESSAGE);
  });

  it('debería devolver el mensaje de error de selección mínima', () => {
    const minSelectionLimit = 2;
    const control = { touched: true, invalid: true, errors: { minSelection: true } };
    const errorMessage = FormControlErrorsMapper.mapErrorMessage(control, minSelectionLimit, 0);
    expect(errorMessage).toBe(ErrorMessages.MIN_SELECTION_ERROR_MESSAGE(minSelectionLimit));
  });

  it('debería devolver el mensaje de error de selección máxima', () => {
    const maxSelectionLimit = 3;
    const control = { touched: true, invalid: true, errors: { maxSelection: true } };
    const errorMessage = FormControlErrorsMapper.mapErrorMessage(control, 0, maxSelectionLimit);
    expect(errorMessage).toBe(ErrorMessages.MAX_SELECTION_ERROR_MESSAGE(maxSelectionLimit));
  });

  it('debería devolver el mensaje de error de solo números enteros', () => {
    const control = { touched: true, invalid: true, errors: { noInteger: true } };
    const errorMessage = FormControlErrorsMapper.mapErrorMessage(control, 0, 0);
    expect(errorMessage).toBe(ErrorMessages.ONLY_INTEGER_ERROR_MESSAGE);
  });

  it('debería devolver el mensaje de error de edad mínima', () => {
    const control = { touched: true, invalid: true, errors: { underage: true } };
    const errorMessage = FormControlErrorsMapper.mapErrorMessage(control, 0, 0);
    expect(errorMessage).toBe(ErrorMessages.AGE_ERROR_MESSAGE);
  });

  it('debería devolver el mensaje de error de correo inválido', () => {
    const control = { touched: true, invalid: true, errors: { email: true } };
    const errorMessage = FormControlErrorsMapper.mapErrorMessage(control, 0, 0);
    expect(errorMessage).toBe(ErrorMessages.INVALID_EMAIL_ERROR_MESSAGE);
  });

  it('debería devolver el mensaje de error de número de teléfono inválido', () => {
    const control = { touched: true, invalid: true, errors: { invalidPhoneNumber: true } };
    const errorMessage = FormControlErrorsMapper.mapErrorMessage(control, 0, 0);
    expect(errorMessage).toBe(ErrorMessages.INVALID_PHONE_NUMBER_ERROR_MESSAGE);
  });

  it('debería devolver el mensaje de error de contraseña débil', () => {
    const control = { touched: true, invalid: true, errors: { weakPassword: true } };
    const errorMessage = FormControlErrorsMapper.mapErrorMessage(control, 0, 0);
    expect(errorMessage).toBe(ErrorMessages.INVALID_PASSWORD_ERROR_MESSAGE);
  });

  it('debería devolver una cadena vacía si el control no tiene errores', () => {
    const control = { touched: true, invalid: false, errors: null };
    const errorMessage = FormControlErrorsMapper.mapErrorMessage(control, 0, 0);
    expect(errorMessage).toBe('');
  });

  it('debería devolver una cadena vacía si el control no está marcado como tocado', () => {
    const control = { touched: false, invalid: true, errors: { required: true } };
    const errorMessage = FormControlErrorsMapper.mapErrorMessage(control, 0, 0);
    expect(errorMessage).toBe('');
  });
});
