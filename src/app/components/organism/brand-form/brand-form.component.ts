import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Brand } from 'src/app/core/models/brand';
import {
  BrandErrorMessages,
  FieldLimits,
} from 'src/app/shared/constants/brandConstants';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.scss'],
})
export class BrandFormComponent implements OnInit {
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
  formControlDescriptionName: string = 'description';
  formControlNameName: string = 'name';
  brandForm: FormGroup;

  @Output() submitForm = new EventEmitter<Brand>();

  ngOnInit(): void {}

  onSubmit() {
    if (this.brandForm.valid) {
      
      const brand: Brand = {
        name: this.brandForm.value['name'],
        description: this.brandForm.value['description'],
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
