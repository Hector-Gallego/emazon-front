import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Brand } from 'src/app/modules/brand/interfaces/brand.interface';
import {
  BrandErrorMessages,
  FieldLimits,
} from 'src/app/modules/brand/constant/brand.constant';

import { InputState } from 'src/app/shared/enums/input-state.enum';
import { BrandDataForm } from '../../../interfaces/brand-data-form.interface';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.scss'],
})
export class BrandFormComponent {
  constructor(fb: FormBuilder) {
    this.brandForm = fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(FieldLimits.MAX_LENGTH_BRAND_NAME_FIELD),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.maxLength(FieldLimits.MAX_LENGTH_BRAND_DESCRIPTION_FIELD),
        ],
      ],
    });
  }

  fieldNameDescription: string = 'Descripción';
  fieldNameName: string = 'Nombre';
  formControlNameDescription: string = 'description';
  formControlNameName: string = 'name';
  brandForm: FormGroup;
  stateDefault: InputState = InputState.DEFAULT;
  stateError: InputState = InputState.ERROR;
  formTittle: string = 'Agregar Marca';
  buttonLabelText: string = 'Guardar';

  @Output() submitForm = new EventEmitter<BrandDataForm>();

  onSubmit() {
    if (this.brandForm.valid) {
      const brand: BrandDataForm = {
        name: this.brandForm.value[this.formControlNameName],
        description: this.brandForm.value[this.formControlNameDescription],
      };

      this.submitForm.emit(brand);
    } else {
      this.brandForm.markAllAsTouched();
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.brandForm.get(controlName);
    if (control?.touched && control?.invalid) {
      if (control.errors?.['required']) {
        return BrandErrorMessages.REQUIERED_ERROR_MESSAGE;
      }
      if (control.errors?.['maxlength']) {
        return BrandErrorMessages.MAX_LENGTH_ERROR_MESSAGE(
          control.errors['maxlength'].requiredLength
        );
      }
    }
    return '';
  }

  resetForm() {
    this.brandForm.reset();
  }
}
