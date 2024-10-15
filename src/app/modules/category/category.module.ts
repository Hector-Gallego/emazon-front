import { NgModule } from '@angular/core';
import { CategoryFormComponent } from './components/organism/category-form/category-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DesignSystemModule } from 'src/app/design-system/design-system.module';

@NgModule({
  declarations: [CategoryFormComponent],
  imports: [SharedModule, DesignSystemModule],
  exports: [CategoryFormComponent],
})
export class CategoryModule {}
