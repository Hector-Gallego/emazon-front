import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { FormComponent } from 'src/app/components/organism/form/form.component';
import { StatesTypes, ErrorMessages } from 'src/app/shared/constants/commonConstants';
import { MainRoutes } from 'src/app/shared/constants/routes.constants';
import { InputContentType } from 'src/app/shared/enums/input-content-type.enum';
import { InputType } from 'src/app/shared/enums/inputs-type.enum';
import { ApiResponse } from 'src/app/shared/interfaces/api-response.interface';
import { FormField } from 'src/app/shared/interfaces/form-field.interface';
import { User } from 'src/app/shared/interfaces/user.interface';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { UserPersistenceService } from 'src/app/shared/services/user-persistence/user-persistence.service';
import { CustomValidator } from 'src/app/shared/validators/custom-validator.validator';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent {

  constructor(
    private readonly userPersistenceService: UserPersistenceService,
    private readonly loaderService: LoaderService,
    private readonly router: Router,
  
  ) {}

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
      placeholder: 'Ingrese sus apellidos',
      validators: [Validators.required],
    },
    {
      label: 'Documento de identidad',
      formControlName: 'identityDocument',
      contentType: InputContentType.NUMBER,
      type: InputType.INPUT,
      placeholder: 'Ingrese su documento de identidad',
      validators: [CustomValidator.integer(), Validators.required],
    },
    {
      label: 'Número de celular',
      formControlName: 'phoneNumber',
      contentType: InputContentType.TEXT,
      type: InputType.INPUT,
      placeholder: 'Ingrese su número de celular',
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
      placeholder: 'Ingrese su fecha de nacimiento',
      validators: [Validators.required, CustomValidator.adultValidator()],
    },
    {
      label: 'Correo electrónico',
      formControlName: 'email',
      contentType: InputContentType.EMAIL,
      type: InputType.INPUT,
      placeholder: 'Ingrese su correo electrónico',
      validators: [Validators.required, Validators.email],
    },
    {
      label: 'Contraseña',
      formControlName: 'password',
      contentType: InputContentType.PASSWORD,
      type: InputType.INPUT,
      placeholder: 'Ingrese su contraseña',
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
  private readonly subscription = new Subscription();
  loginRoute = `/${MainRoutes.AUTH}/${MainRoutes.LOGIN}`

  onFormSubmit(userData: User) {
    const newDate = new Date(userData.birthDate);
    const formattedDate: string = newDate.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    userData.birthDate = formattedDate;

    this.loaderService.show();
    const addUserSubscription = this.userPersistenceService
      .addUserClient(userData)
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe({
        next: (response: ApiResponse) => {     
          this.userForm.resetForm();
          this.router.navigate([`/${MainRoutes.AUTH}/${MainRoutes.LOGIN}`])
          
        },
      });

    this.subscription.add(addUserSubscription);
  }

}
