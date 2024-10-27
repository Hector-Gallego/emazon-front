import { AbstractControl } from '@angular/forms';
import { Regex } from '../constants/regex.constants';
import { CustomValidator } from './custom-validator.validator';

describe('CustomValidator', () => {

  describe('integer validator', () => {
    it('debería devolver null si el valor es un entero positivo', () => {
      const control = { value: '123' } as AbstractControl;
      const result = CustomValidator.integer()(control);
      expect(result).toBeNull();
    });

    it('debería devolver un error si el valor no es un entero positivo', () => {
      const control = { value: '123a' } as AbstractControl;
      const result = CustomValidator.integer()(control);
      expect(result).toEqual({ noInteger: true });
    });
  });

  describe('maxSelectionLimitValidator', () => {
    it('debería devolver null si el tamaño del array es menor o igual al límite máximo', () => {
      const control = { value: [1, 2, 3] } as AbstractControl;
      const result = CustomValidator.maxSelectionLimitValidator(3)(control);
      expect(result).toBeNull();
    });

    it('debería devolver un error si el tamaño del array excede el límite máximo', () => {
      const control = { value: [1, 2, 3, 4] } as AbstractControl;
      const result = CustomValidator.maxSelectionLimitValidator(3)(control);
      expect(result).toEqual({ maxSelection: true });
    });
  });

  describe('minSelectionLimitValidator', () => {
    it('debería devolver null si el tamaño del array es mayor o igual al límite mínimo', () => {
      const control = { value: [1, 2] } as AbstractControl;
      const result = CustomValidator.minSelectionLimitValidator(2)(control);
      expect(result).toBeNull();
    });

    it('debería devolver un error si el tamaño del array es menor al límite mínimo', () => {
      const control = { value: [1] } as AbstractControl;
      const result = CustomValidator.minSelectionLimitValidator(2)(control);
      expect(result).toEqual({ minSelection: true });
    });
  });

  describe('adultValidator', () => {
    it('debería devolver null si la persona es mayor o igual a la edad mínima', () => {
      const birthDate = new Date();
      birthDate.setFullYear(birthDate.getFullYear() - 18);
      const control = { value: birthDate.toISOString().split('T')[0] } as AbstractControl;
      const result = CustomValidator.adultValidator(18)(control);
      expect(result).toBeNull();
    });

    it('debería devolver un error si la persona es menor que la edad mínima', () => {
      const birthDate = new Date();
      birthDate.setFullYear(birthDate.getFullYear() - 17);
      const control = { value: birthDate.toISOString().split('T')[0] } as AbstractControl;
      const result = CustomValidator.adultValidator(18)(control);
      expect(result).toEqual({ underage: true });
    });
  });

  describe('phoneNumberFormatValidator', () => {
    it('debería devolver null si el número de teléfono cumple con el formato', () => {
      const control = { value: '123-456-7890' } as AbstractControl;
      Regex.PHONE_NUMBER_REGEX = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
      const result = CustomValidator.phoneNumberFormatValidator()(control);
      expect(result).toBeNull();
    });

    it('debería devolver un error si el número de teléfono no cumple con el formato', () => {
      const control = { value: 'invalid-number' } as AbstractControl;
      Regex.PHONE_NUMBER_REGEX = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
      const result = CustomValidator.phoneNumberFormatValidator()(control);
      expect(result).toEqual({ invalidPhoneNumber: true });
    });
  });

  describe('passwordStrengthValidator', () => {
    it('debería devolver null si la contraseña cumple con los requisitos de fortaleza', () => {
      const control = { value: 'StrongPass1!' } as AbstractControl;
      Regex.PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      const result = CustomValidator.passwordStrengthValidator()(control);
      expect(result).toBeNull();
    });

    it('debería devolver un error si la contraseña no cumple con los requisitos de fortaleza', () => {
      const control = { value: 'weakpass' } as AbstractControl;
      Regex.PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      const result = CustomValidator.passwordStrengthValidator()(control);
      expect(result).toEqual({ weakPassword: true });
    });
  });
});
