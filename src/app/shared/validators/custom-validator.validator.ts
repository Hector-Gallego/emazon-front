import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Regex } from '../constants/regex.constants';

export class CustomValidator {
  static integer(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const regex = /^\d+$/;
      //convertirlo a numero, y luego hacer la validacion
      const valid = regex.test(control.value);
      return valid ? null : { noInteger: true };
    };
  }

  static maxSelectionLimitValidator(max: number): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors |null  => {
      const value = control.value;
      const valid = Array.isArray(value) && value.length <= max;
      return valid ? null : { maxSelection: true } ;
    };
  }

  static minSelectionLimitValidator(min: number): ValidatorFn {
    return (control : AbstractControl) : ValidationErrors | null => {
      const value = control.value;
      const valid = Array.isArray(value) && value.length >= min;
      return valid ? null : { minSelection: true } ;
    };
  }

  static adultValidator(minAge: number = 18): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const birthDate = new Date(control.value);
      const today = new Date();

      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      const dayDifference = today.getDate() - birthDate.getDate();

      const isAdult = age > minAge || (age === minAge && (monthDifference > 0 || (monthDifference === 0 && dayDifference >= 0)));

      return isAdult ? null : { underage: true };
    };
  }

  static phoneNumberFormatValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const regex = Regex.PHONE_NUMBER_REGEX;
      const valid = regex.test(control.value);
      return valid ? null : { invalidPhoneNumber: true };
    };
  }

  static passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const regex = Regex.PASSWORD_REGEX;
      const valid = regex.test(control.value);
      return valid ? null : { weakPassword: true };
    };
  }  
}
