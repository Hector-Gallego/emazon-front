import { NgModule } from '@angular/core';
import { ButtonComponent } from '../../components/atoms/button/button.component';
import { DivisorComponent } from '../../components/atoms/divisor/divisor.component';
import { IconComponent } from '../../components/atoms/icon/icon.component';
import { InputComponent } from '../../components/atoms/input/input.component';
import { LabelComponent } from '../../components/atoms/label/label.component';
import { LoaderComponent } from '../../components/atoms/loader/loader.component';
import { LogoComponent } from '../../components/atoms/logo/logo.component';
import { NavigationBarButtonComponent } from '../../components/atoms/navigation-bar-buttom/navigation-bar-button.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MultipleInputSelectComponent } from './multiple-input-select/multiple-input-select.component';
import { InputSelectComponent } from './input-select/input-select.component';

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
    MultipleInputSelectComponent,
    InputSelectComponent,
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
    MultipleInputSelectComponent,
    InputSelectComponent,
  ],
})
export class AtomsModule {}
