import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { BrandFormComponent } from 'src/app/components/organism/brand-form/brand-form.component';
import { ApiResponse } from 'src/app/core/models/apiResponse';
import { Brand } from 'src/app/core/models/brand';
import { BrandService } from 'src/app/core/services/brand/brand.service';
import {
  ErrorMessages,
  StatesTypes,
} from 'src/app/shared/constants/commonConstants';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
  selector: 'app-add-brand-page',
  templateUrl: './add-brand-page.component.html',
  styleUrls: ['./add-brand-page.component.scss'],
})
export class AddBrandPageComponent implements OnInit, OnDestroy {
  constructor(
    private brandService: BrandService,
    private loaderService: LoaderService,
    private toastService: ToastService
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {}

  @ViewChild(BrandFormComponent) brandForm!: BrandFormComponent;

  toastMessage: string = '';
  toastType: StatesTypes = StatesTypes.SUCCESS;
  private subscription = new Subscription();

  onFormSubmit(brand: Brand) {
    this.loaderService.show();
    const addBrandSubscription = this.brandService
      .addBrand(brand)
      .subscribe({
        next: (response: ApiResponse) => {
          this.toastMessage = response.message;
          this.toastType = StatesTypes.SUCCESS;

          this.triggerToast(this.toastMessage, this.toastType, 10000);

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
          this.triggerToast(this.toastMessage, this.toastType, 10000);
          this.loaderService.hide();
        },
        complete: () => {
          this.loaderService.hide();
        },
      });

    this.subscription.add(addBrandSubscription);
  }

  triggerToast(message: string, type: StatesTypes, duration: number) {
    this.toastService.showToast({
      message: message,
      duration: duration,
      type: type,
    });
  }
}
