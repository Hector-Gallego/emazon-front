import { Component, OnDestroy, ViewChild } from '@angular/core';
import { CategoryFormComponent } from 'src/app/modules/category/components/organism/category-form/category-form.component';
import { CategoryPersistenceService } from 'src/app/modules/category/services/category-persistence/category-persistence.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import {
  ErrorMessages,
  StatesTypes,
} from 'src/app/shared/constants/commonConstants';
import { ApiResponse } from 'src/app/shared/interfaces/api-response.interface';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { Subscription } from 'rxjs';
import { CategoryDataForm } from 'src/app/modules/category/interfaces/category-data-form.interface';

@Component({
  selector: 'app-add-category-page',
  templateUrl: './add-category-page.component.html',
  styleUrls: ['./add-category-page.component.scss'],
})
export class AddCategoryPageComponent implements OnDestroy {
  constructor(
    private categoryService: CategoryPersistenceService,
    private loaderService: LoaderService,
    private toastService: ToastService
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private subscription = new Subscription();
  @ViewChild(CategoryFormComponent) categoryForm!: CategoryFormComponent;

  toastMessage: string = '';
  toastType: StatesTypes = StatesTypes.SUCCESS;
  toastDuration: number = 10000;

  onFormSubmit(formData: CategoryDataForm) {
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
          if (error.error && error.error.message) {
            this.toastMessage = error.error.message;
          } else {
            this.toastMessage = ErrorMessages.GENERIC_ERROR_MESSAGE;
          }

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
