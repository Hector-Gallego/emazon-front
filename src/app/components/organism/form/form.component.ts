import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { ErrorMessages } from 'src/app/shared/constants/commonConstants';
import { InputState } from 'src/app/shared/enums/input-state.enum';
import { InputType } from 'src/app/shared/enums/inputs-type.enum';

import { FormField } from 'src/app/shared/interfaces/form-field.interface';
import { FormControlErrorsMapper } from 'src/app/shared/mappers/form-control-errors-mapper/form-control-errors.mapper';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent<T> implements OnInit {
  @Input() formTitle: string = 'Formulario';
  @Input() buttonLabelText: string = 'Guardar';
  @Input() fields: FormField[] = [];

  @Output() submitForm = new EventEmitter<T>();
  @Output() pageChange = new EventEmitter<number>();

  inputStateError = InputState.ERROR;
  inputStateDefault = InputState.DEFAULT;

  inputTypeInput: InputType = InputType.INPUT;
  inputTypeTextarea: InputType = InputType.TEXTAREA;
  inputTypeMultipleSelect: InputType = InputType.MULTIPLE_SELECT;
  inputTypeSelect: InputType = InputType.SELECT;
  maxSelectionLimit: number = 0;
  minSelectionLimit: number = 0;

  formGroup: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.formGroup = this.fb.group({});
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    const formControls: { [key: string]: [string, ValidatorFn[]] } = {};
    this.fields.forEach((field) => {
      formControls[field.formControlName] = ['', field.validators || []];

      if (field.type === this.inputTypeMultipleSelect) {
        this.maxSelectionLimit = field.maxSelectionLimit ?? 0;
        this.minSelectionLimit = field.minSelectionLimit ?? 0;
      }
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
    return FormControlErrorsMapper.mapErrorMessage(control, this.minSelectionLimit, this.maxSelectionLimit);
  }

  resetForm() {
    this.formGroup.reset();
  }
}
