import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormComponent } from 'src/app/components/organism/form/form.component';
import { CategoryPersistenceService } from 'src/app/shared/services/category-persistence/category-persistence.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import {
  ErrorMessages,
  StatesTypes,
} from 'src/app/shared/constants/commonConstants';
import { ApiResponse } from 'src/app/shared/interfaces/api-response.interface';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { Subscription } from 'rxjs';
import { FormField } from 'src/app/shared/interfaces/form-field.interface';
import { Validators } from '@angular/forms';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { InputType } from 'src/app/shared/enums/inputs-type.enum';

@Component({
  selector: 'app-add-category-page',
  templateUrl: './add-category-page.component.html',
  styleUrls: ['./add-category-page.component.scss'],
})
export class AddCategoryPageComponent implements OnDestroy {
  constructor(
    private readonly categoryService: CategoryPersistenceService,
    private readonly loaderService: LoaderService,
    private readonly toastService: ToastService
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  categoryFields: FormField[] = [
    {
      label: 'Nombre',
      formControlName: 'name',
      type: InputType.INPUT,
      placeholder: 'Ingresa el nombre',
      validators: [Validators.required, Validators.maxLength(50)],
    },
    {
      label: 'Descripción',
      formControlName: 'description',
      type: InputType.TEXTAREA,
      placeholder: 'Ingresa la descripción',
      validators: [Validators.required, Validators.maxLength(60)],
    },
  ];

  private readonly subscription = new Subscription();
  @ViewChild(FormComponent) categoryForm!: FormComponent;

  toastMessage: string = '';
  toastType: StatesTypes = StatesTypes.SUCCESS;
  toastDuration: number = 10000;

  onFormSubmit(formData: Category) {
    this.loaderService.show();
    const addCategorySubscription = this.categoryService
      .addCategory(formData)
      .subscribe({
        next: (response: ApiResponse) => {
          this.toastMessage = response.message;
          this.toastType = StatesTypes.SUCCESS;

          this.toastService.triggerToast(
            this.toastMessage,
            this.toastType,
            this.toastDuration
          );

          this.categoryForm.resetForm();
          this.loaderService.hide();
        },
        error: (error) => {
          this.toastMessage =
            error?.error?.message || ErrorMessages.GENERIC_ERROR_MESSAGE;

          this.toastType = StatesTypes.ERROR;
          this.toastService.triggerToast(
            this.toastMessage,
            this.toastType,
            this.toastDuration
          );
          this.loaderService.hide();
        },
        complete: () => {
          this.loaderService.hide();
        },
      });

    this.subscription.add(addCategorySubscription);
  }
}
