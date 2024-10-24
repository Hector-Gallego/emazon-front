import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

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
}
