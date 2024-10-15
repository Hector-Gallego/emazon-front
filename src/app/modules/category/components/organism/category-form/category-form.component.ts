import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CategoryErrorMessages,
  FieldLimits,
} from 'src/app/modules/category/constants/category.constants';
import { InputState } from 'src/app/shared/enums/input-state.enum';
import { Category } from '../../../interfaces/category.interface';
import { CategoryDataForm } from '../../../interfaces/category-data-form.interface';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent {
  fieldNameDescription: string = 'Descripción';
  fieldNameName: string = 'Nombre';
  formControlDescriptionName: string = 'description';
  formControlNameName: string = 'name';
  inputStateError = InputState.ERROR;
  inputStateDefault = InputState.DEFAULT;

  formTittle: string = 'Agregar Categoría';
  buttonLabelText: string = 'Guardar';

  categoryForm: FormGroup;

  @Output() submitForm = new EventEmitter<CategoryDataForm>();

  constructor(fb: FormBuilder) {
    this.categoryForm = fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(FieldLimits.MAX_LENGTH_CATEGORY_NAME_FIELD),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.maxLength(
            FieldLimits.MAX_LENGTH_CATEGORY_DESCRIPTION_FIELD
          ),
        ],
      ],
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const category: CategoryDataForm = {
        name: this.categoryForm.value[this.formControlNameName],
        description: this.categoryForm.value[this.formControlDescriptionName],
      };
      this.submitForm.emit(category);
    } else {
      this.categoryForm.markAllAsTouched();
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.categoryForm.get(controlName);
    if (control?.touched && control?.invalid) {
      if (control.errors?.['required']) {
        return CategoryErrorMessages.REQUIERED_ERROR_MESSAGE;
      }
      if (control.errors?.['maxlength']) {
        return CategoryErrorMessages.MAX_LENGTH_ERROR_MESSAGE(
          control.errors['maxlength'].requiredLength
        );
      }
    }
    return '';
  }

  resetForm() {
    this.categoryForm.reset();
  }
}
