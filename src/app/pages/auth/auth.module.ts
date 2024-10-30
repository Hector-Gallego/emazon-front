import { NgModule } from '@angular/core';
import { LoginPageComponent } from './login-page/login-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrganismModule } from 'src/app/components/organism/organism.module';
import { MoleculesModule } from 'src/app/components/molecules/molecules.module';
import { AtomsModule } from 'src/app/components/atoms/atoms.module';
import { AuthRoutingModule } from './auth-routing.module';
import { RegistrationPageComponent } from './registration-page/registration-page.component';


@NgModule({
  declarations: [LoginPageComponent, RegistrationPageComponent],
  imports: [
    SharedModule,
    OrganismModule,
    MoleculesModule,
    AtomsModule,
    AuthRoutingModule
  
  ],
  exports: [LoginPageComponent, RegistrationPageComponent],
})
export class AuthModule {}
