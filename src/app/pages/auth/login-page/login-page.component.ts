import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, Subscription } from 'rxjs';
import { FormComponent } from 'src/app/components/organism/form/form.component';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { TokenService } from 'src/app/core/services/token-service/token.service';
import {
  ErrorMessages,
  StatesTypes,
} from 'src/app/shared/constants/commonConstants';
import { MainRoutes } from 'src/app/shared/constants/routes.constants';
import { InputContentType } from 'src/app/shared/enums/input-content-type.enum';
import { InputType } from 'src/app/shared/enums/inputs-type.enum';
import { Role } from 'src/app/shared/enums/role.enum';
import { FormField } from 'src/app/shared/interfaces/form-field.interface';
import { LoginRequest } from 'src/app/shared/interfaces/login-request.interface';
import { LoginResponse } from 'src/app/shared/interfaces/login.response.interface';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { UserPersistenceService } from 'src/app/shared/services/user-persistence/user-persistence.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  constructor(
    private readonly authService: AuthService,
    private readonly toastService: ToastService,
    private readonly loaderService: LoaderService,
    private readonly router: Router,
    private readonly tokenService: TokenService
  ) {}

  loginFields: FormField[] = [
    {
      label: 'Correo Eléctronico',
      formControlName: 'username',
      contentType: InputContentType.EMAIL,
      type: InputType.INPUT,
      placeholder: 'Ingrese su correo eléctronico',
      validators: [Validators.required, Validators.email],
    },
    {
      label: 'Contraseña',
      formControlName: 'password',
      contentType: InputContentType.PASSWORD,
      type: InputType.INPUT,
      placeholder: 'Ingrese su contraseña',
      validators: [Validators.required],
    },
  ];

  toastMessage: string = '';
  toastType: StatesTypes = StatesTypes.SUCCESS;
  toastDuration: number = 10000;

  private readonly subscription = new Subscription();
  @ViewChild(FormComponent) logindForm!: FormComponent<LoginRequest>;
   registrationRoute = `/${MainRoutes.AUTH}/${MainRoutes.REGISTER}`

  onFormSubmit(loginData: LoginRequest) {
    
    this.loaderService.show();
    const addBrandSubscription = this.authService
      .login(loginData)
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe({
        next: () => {
          const userRole = this.tokenService.getRoleUser();
          this.router.navigate([
            userRole === Role.ADMIN || userRole === Role.WAREHOUSE_ASSISTANT
              ? MainRoutes.ADMIN
              : MainRoutes.STORE,
          ]);
          this.loginForm.resetForm();
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
  @ViewChild(FormComponent) loginForm!: FormComponent<LoginRequest>;

}
