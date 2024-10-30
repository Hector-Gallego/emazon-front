import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthTemplateComponent } from 'src/app/templates/auth-template/auth-template.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';


const routes: Routes = [
  {
    path: '',
    component: AuthTemplateComponent,
    children: [
      { path: 'login', component: LoginPageComponent },
      { path: 'registro', component: RegistrationPageComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}