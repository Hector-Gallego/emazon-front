import { Component, OnDestroy, ViewChild } from '@angular/core';
import { finalize, Subscription } from 'rxjs';
import { ApiResponse } from 'src/app/shared/interfaces/api-response.interface';
import { BrandPersistenceService } from 'src/app/shared/services/brand-persistence/brand-persistence.service';
import {
  ErrorMessages,
  StatesTypes,
} from 'src/app/shared/constants/commonConstants';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { Validators } from '@angular/forms';
import { FormField } from 'src/app/shared/interfaces/form-field.interface';
import { FormComponent } from 'src/app/components/organism/form/form.component';
import { Brand } from 'src/app/shared/interfaces/brand.interface';
import { BrandFieldLimits } from 'src/app/shared/constants/brand.constant';
import { InputType } from 'src/app/shared/enums/inputs-type.enum';
import { InputContentType } from 'src/app/shared/enums/input-content-type.enum';

@Component({
  selector: 'app-add-brand-page',
  templateUrl: './add-brand-page.component.html',
  styleUrls: ['./add-brand-page.component.scss'],
})
export class AddBrandPageComponent implements OnDestroy {
  constructor(
    private readonly brandService: BrandPersistenceService,
    private readonly loaderService: LoaderService,
    private readonly toastService: ToastService
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @ViewChild(FormComponent) brandForm!: FormComponent;

  brandFields: FormField[] = [
    {
      label: 'Nombre',
      formControlName: 'name',
      contentType: InputContentType.TEXT,
      type: InputType.INPUT,
      placeholder: 'Ingresa el nombre',
      validators: [
        Validators.required,
        Validators.maxLength(BrandFieldLimits.MAX_LENGTH_BRAND_NAME_FIELD),
      ],
    },
    {
      label: 'Descripción',
      formControlName: 'description',
      contentType: InputContentType.TEXT,
      type: InputType.TEXTAREA,
      placeholder: 'Ingresa la descripción',
      validators: [
        Validators.required,
        Validators.maxLength(
          BrandFieldLimits.MAX_LENGTH_BRAND_DESCRIPTION_FIELD
        ),
      ],
    },
  ];

  toastMessage: string = '';
  toastType: StatesTypes = StatesTypes.SUCCESS;
  toastDuration: number = 10000;

  private readonly subscription = new Subscription();

  onFormSubmit(brandDataForm: Brand) {
    this.loaderService.show();
    const addBrandSubscription = this.brandService
      .addBrand(brandDataForm)
      .pipe(finalize(() => this.loaderService.hide()))
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
        },
      });

    this.subscription.add(addBrandSubscription);
  }
}
