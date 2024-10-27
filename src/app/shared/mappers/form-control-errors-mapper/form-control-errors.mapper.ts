
import { ErrorMessages } from 'src/app/shared/constants/commonConstants';

export class FormControlErrorsMapper {
  static mapErrorMessage(control: any, minSelectionLimit: number, maxSelectionLimit: number): string {
    if (control?.touched && control?.invalid) {
      const errorMessagesMap: { [key: string]: (control?: any) => string } = {
        required: () => ErrorMessages.REQUIERED_ERROR_MESSAGE,
        maxlength: () => ErrorMessages.MAX_LENGTH_ERROR_MESSAGE(control.errors['maxlength'].requiredLength),
        min: () => ErrorMessages.POSITIVE_NUMBER_ERROR_MESSAGE,
        minSelection: () => ErrorMessages.MIN_SELECTION_ERROR_MESSAGE(minSelectionLimit),
        maxSelection: () => ErrorMessages.MAX_SELECTION_ERROR_MESSAGE(maxSelectionLimit),
        noInteger: () => ErrorMessages.ONLY_INTEGER_ERROR_MESSAGE,
        underage: () => ErrorMessages.AGE_ERROR_MESSAGE,
        email: () => ErrorMessages.INVALID_EMAIL_ERROR_MESSAGE,
        invalidPhoneNumber: () => ErrorMessages.INVALID_PHONE_NUMBER_ERROR_MESSAGE,
        weakPassword: () => ErrorMessages.INVALID_PASSWORD_ERROR_MESSAGE,
      };

      for (const errorKey in control.errors) {
        if (errorMessagesMap[errorKey]) {
          return errorMessagesMap[errorKey](control);
        }
      }
    }
    return '';
  }
}
