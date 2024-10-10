import { Component, OnDestroy, ViewChild } from '@angular/core';
import { ToastComponent } from 'src/app/components/molecules/toast/toast.component';
import { CategoryFormComponent } from 'src/app/components/organism/category-form/category-form.component';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import {
  ErrorMessages,
  StatesTypes,
} from 'src/app/shared/constants/commonConstants';
import { Category } from 'src/app/core/models/category';
import { ApiResponse } from 'src/app/core/models/apiResponse';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-category-page',
  templateUrl: './add-category-page.component.html',
  styleUrls: ['./add-category-page.component.scss'],
})
export class AddCategoryPageComponent implements OnDestroy {
  constructor(
    private categoryService: CategoryService,
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

  onFormSubmit(formData: Category) {

    this.loaderService.show();
    const addCategorySubscription = this.categoryService
      .addCategory(formData)
      .subscribe({
        next: (response: ApiResponse) => {
          console.log(response);
          this.toastMessage = response.message;
          this.toastType = StatesTypes.SUCCESS;

          this.triggerToast(this.toastMessage, this.toastType, 10000);

          this.categoryForm.resetForm();
          this.loaderService.hide();
        },
        error: (error) => {
          console.log(error);

          if (error.error && error.error.message) {
            this.toastMessage = error.error.message;
          } else {
            this.toastMessage = ErrorMessages.GENERIC_ERROR_MESSAGE;
          }

          this.toastType = StatesTypes.ERROR;
          this.triggerToast(this.toastMessage, this.toastType, 10000);
          this.loaderService.hide();
        },
        complete: () => {
          this.loaderService.hide();
        },
      });

      this.subscription.add(addCategorySubscription);
  }

  triggerToast(message: string, type: StatesTypes, duration: number) {
    this.toastService.showToast({
      message: message,
      duration: duration,
      type: type,
    });
  }
}
