import { NgModule } from '@angular/core';
import { ToastComponent } from './toast/toast.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AtomsModule } from '../atoms/atoms.module';

@NgModule({
  declarations: [ToastComponent],
  imports: [SharedModule, AtomsModule],
  exports: [ToastComponent],
})
export class MoleculesModule {}
