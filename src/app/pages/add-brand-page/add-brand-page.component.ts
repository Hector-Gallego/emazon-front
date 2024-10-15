import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { BrandFormComponent } from 'src/app/modules/brand/components/organism/brand-form/brand-form.component';
import { ApiResponse } from 'src/app/shared/interfaces/api-response.interface';
import { BrandPersistenceService } from 'src/app/modules/brand/services/brand-persistence/brand-persistence.service';
import {
  ErrorMessages,
  StatesTypes,
} from 'src/app/shared/constants/commonConstants';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { BrandDataForm } from 'src/app/modules/brand/interfaces/brand-data-form.interface';

@Component({
  selector: 'app-add-brand-page',
  templateUrl: './add-brand-page.component.html',
  styleUrls: ['./add-brand-page.component.scss'],
})
export class AddBrandPageComponent implements OnDestroy {
  constructor(
    private brandService: BrandPersistenceService,
    private loaderService: LoaderService,
    private toastService: ToastService
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @ViewChild(BrandFormComponent) brandForm!: BrandFormComponent;

  toastMessage: string = '';
  toastType: StatesTypes = StatesTypes.SUCCESS;
  toastDuration: number = 10000;

  private subscription = new Subscription();

  onFormSubmit(brandDataForm: BrandDataForm) {
    this.loaderService.show();
    const addBrandSubscription = this.brandService
      .addBrand(brandDataForm)
      .subscribe({
        next: (response: ApiResponse) => {
          this.toastMessage = response.message;
          this.toastType = StatesTypes.SUCCESS;

          this.toastService.triggerToast(
            this.toastMessage,
            this.toastType,
            this.toastDuration
          );

          this.brandForm.resetForm();
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

    this.subscription.add(addBrandSubscription);
  }
}
