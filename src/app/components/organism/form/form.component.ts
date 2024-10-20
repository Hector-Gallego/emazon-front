import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { CategoryErrorMessages } from 'src/app/shared/constants/category.constants';
import { InputState } from 'src/app/shared/enums/input-state.enum';
import { InputType } from 'src/app/shared/enums/inputs-type.enum';
import { Brand } from 'src/app/shared/interfaces/brand.interface';
import { Category } from 'src/app/shared/interfaces/category.interface';

import { FormField } from 'src/app/shared/interfaces/form-field.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() formTitle: string = 'Formulario';
  @Input() buttonLabelText: string = 'Guardar';
  @Input() fields: FormField[] = [];
  @Output() submitForm = new EventEmitter<Category | Brand>();

  inputStateError = InputState.ERROR;
  inputStateDefault = InputState.DEFAULT;

  inputTypeInput: InputType = InputType.INPUT;
  inputTypeTextarea: InputType = InputType.TEXTAREA;
  inputTypeSelect: InputType = InputType.SELECT;

  formGroup: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.formGroup = this.fb.group({});
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    const formControls: { [key: string]: [string, ValidatorFn[]] } = {};
    this.fields.forEach((field) => {
      formControls[field.formControlName] = ['', field.validators || []];
    });
    this.formGroup = this.fb.group(formControls);
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.submitForm.emit(this.formGroup.value);
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.formGroup.get(controlName);
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
    this.formGroup.reset();
  }

  onSelectionChange(selectedValues: string[], formControlName: string): void {
    this.formGroup.get(formControlName)?.setValue(selectedValues);
  }
}
