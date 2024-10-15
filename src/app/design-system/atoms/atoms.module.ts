import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { DivisorComponent } from './divisor/divisor.component';
import { IconComponent } from './icon/icon.component';
import { InputComponent } from './input/input.component';
import { LabelComponent } from './label/label.component';
import { LoaderComponent } from './loader/loader.component';
import { LogoComponent } from './logo/logo.component';
import { NavigationBarButtonComponent } from './navigation-bar-buttom/navigation-bar-button.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ButtonComponent,
    DivisorComponent,
    IconComponent,
    InputComponent,
    LabelComponent,
    LoaderComponent,
    LogoComponent,
    NavigationBarButtonComponent,
  ],
  imports: [SharedModule],
  exports: [
    ButtonComponent,
    DivisorComponent,
    IconComponent,
    InputComponent,
    LabelComponent,
    LoaderComponent,
    LogoComponent,
    NavigationBarButtonComponent,
  ],
})
export class AtomsModule {}
