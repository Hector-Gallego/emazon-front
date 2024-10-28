import { NgModule } from '@angular/core';
import { LoginPageComponent } from './login-page/login-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrganismModule } from 'src/app/components/organism/organism.module';
import { MoleculesModule } from 'src/app/components/molecules/molecules.module';
import { AtomsModule } from 'src/app/components/atoms/atoms.module';
import { AuthRoutingModule } from './auth-routing.module';


@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    SharedModule,
    OrganismModule,
    MoleculesModule,
    AtomsModule,
    AuthRoutingModule
  
  ],
  exports: [LoginPageComponent],
})
export class AuthModule {}
