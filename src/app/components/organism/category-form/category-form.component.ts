import { Component, EventEmitter, NgModule, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryErrorMessages, FieldLimits} from 'src/app/shared/constants/categoryConstants';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { DivisorComponent } from '../../atoms/divisor/divisor.component';



@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent {

  
  @Output() submitForm = new EventEmitter<any>();

  
  constructor(fb: FormBuilder) {
    this.categoryForm = fb.group({
      name: ['', [Validators.required, Validators.maxLength(FieldLimits.MAX_LENGTH_CATEGORY_NAME_FIELD)]],
      description: ['', [Validators.required, Validators.maxLength(FieldLimits.MAX_LENGTH_CATEGORY_DESCRIPTION_FIELD)]]
    });
  }
  
  categoryForm: FormGroup;

  onSubmit() {
    if (this.categoryForm.valid) {
    
     
      this.submitForm.emit(this.categoryForm.value)
      //this.categoryForm.reset();

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
        return CategoryErrorMessages.MAX_LENGTH_ERROR_MESSAGE(control.errors['maxlength'].requiredLength);
      }
    }
    return ''; 
  }
  
  
  resetForm(){
    this.categoryForm.reset();
  }
   
  
}
