import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { Subscription, finalize } from 'rxjs';
import { FormComponent } from 'src/app/components/organism/form/form.component';
import {
  StatesTypes,
  ErrorMessages,
} from 'src/app/shared/constants/commonConstants';
import { InputContentType } from 'src/app/shared/enums/input-content-type.enum';
import { InputType } from 'src/app/shared/enums/inputs-type.enum';
import { ApiResponse } from 'src/app/shared/interfaces/api-response.interface';
import { FormField } from 'src/app/shared/interfaces/form-field.interface';
import { User } from 'src/app/shared/interfaces/user.interface';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { UserPersistenceService } from 'src/app/shared/services/user-persistence/user-persistence.service';
import { CustomValidator } from 'src/app/shared/validators/custom-validator.validator';

@Component({
  selector: 'app-add-warehouse-assistant-page',
  templateUrl: './add-warehouse-assistant-page.component.html',
  styleUrls: ['./add-warehouse-assistant-page.component.scss'],
})
export class AddWarehouseAssistantPageComponent implements OnInit, OnDestroy {
  constructor(
    private readonly userPersistenceService: UserPersistenceService,
    private readonly loaderService: LoaderService,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {}

  userFields: FormField[] = [
    {
      label: 'Nombres',
      formControlName: 'name',
      contentType: InputContentType.TEXT,
      type: InputType.INPUT,
      placeholder: 'Ingrese el nombre',
      validators: [Validators.required],
    },
    {
      label: 'Apellidos',
      formControlName: 'lastName',
      contentType: InputContentType.TEXT,
      type: InputType.INPUT,
      placeholder: 'Ingrese los apellidos',
      validators: [Validators.required],
    },
    {
      label: 'Documento de identidad',
      formControlName: 'identityDocument',
      contentType: InputContentType.NUMBER,
      type: InputType.INPUT,
      placeholder: 'Ingrese el documento de identidad',
      validators: [CustomValidator.integer(), Validators.required],
    },
    {
      label: 'Número de celular',
      formControlName: 'phoneNumber',
      contentType: InputContentType.TEXT,
      type: InputType.INPUT,
      placeholder: 'Ingrese el número de celular',
      validators: [
        Validators.required,
        CustomValidator.phoneNumberFormatValidator(),
      ],
    },
    {
      label: 'Fecha de nacimiento',
      formControlName: 'birthDate',
      contentType: InputContentType.DATE,
      type: InputType.INPUT,
      placeholder: 'Ingrese la fecha de nacimiento',
      validators: [Validators.required, CustomValidator.adultValidator()],
    },
    {
      label: 'Correo electrónico',
      formControlName: 'email',
      contentType: InputContentType.EMAIL,
      type: InputType.INPUT,
      placeholder: 'Ingrese el correo electrónico',
      validators: [Validators.required, Validators.email],
    },
    {
      label: 'Contraseña',
      formControlName: 'password',
      contentType: InputContentType.PASSWORD,
      type: InputType.INPUT,
      placeholder: 'Ingrese la contraseña',
      validators: [
        Validators.required,
        CustomValidator.passwordStrengthValidator(),
      ],
    },
  ];

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  @ViewChild(FormComponent) userForm!: FormComponent<User>;
  toastMessage: string = '';
  toastType: StatesTypes = StatesTypes.SUCCESS;
  toastDuration: number = 10000;

  private readonly subscription = new Subscription();

  
  onFormSubmit(userData: User) {
    const newDate = new Date(userData.birthDate);
    const formattedDate: string = newDate.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    userData.birthDate = formattedDate;

    this.loaderService.show();
    const addBrandSubscription = this.userPersistenceService
      .addUser(userData)
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

          this.userForm.resetForm();
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
