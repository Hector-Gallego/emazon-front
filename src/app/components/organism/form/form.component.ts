import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  CategoryErrorMessages,
} from 'src/app/shared/constants/category.constants';
import { InputState } from 'src/app/shared/enums/input-state.enum';

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
  @Output() submitForm = new EventEmitter<any>();

  inputStateError = InputState.ERROR;
  inputStateDefault = InputState.DEFAULT;



  formGroup: FormGroup;


  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({});
  }

  ngOnInit(): void {
    this.buildForm(); 
  }

  private buildForm(): void {
    const formControls :{ [key: string]: any } = {}; 
    this.fields.forEach((field) => {
      formControls[field.formControlName] = [
        '',
        field.validators,
      ];
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

  onSelectionChange(selectedValues: any[], formControlName: string): void {
    this.formGroup.get(formControlName)?.setValue(selectedValues);
  }
  
}
