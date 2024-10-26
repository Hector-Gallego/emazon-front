import { NgModule } from '@angular/core';
import { ToastComponent } from './toast/toast.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AtomsModule } from '../atoms/atoms.module';
import { QuantityCounterButtonComponent } from './quantity-counter-button/quantity-counter-button.component';

@NgModule({
  declarations: [ToastComponent, QuantityCounterButtonComponent],
  imports: [SharedModule, AtomsModule],
  exports: [ToastComponent, QuantityCounterButtonComponent],
})
export class MoleculesModule {}
