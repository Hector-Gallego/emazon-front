import { NgModule } from '@angular/core';
import { AddBrandPageComponent } from './add-brand-page/add-brand-page.component';
import { AddCategoryPageComponent } from './add-category-page/add-category-page.component';
import { ListBrandsPageComponent } from './list-brands-page/list-brands-page.component';
import { ListCategoriesPageComponent } from './list-categories-page/list-categories-page.component';
import { SharedModule } from '../shared/shared.module';
import { DesignSystemModule } from '../design-system/design-system.module';
import { CategoryModule } from '../modules/category/category.module';
import { BrandModule } from '../modules/brand/brand.module';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [
    AddBrandPageComponent,
    AddCategoryPageComponent,
    ListBrandsPageComponent,
    ListCategoriesPageComponent,
  ],
  imports: [
    SharedModule,
    DesignSystemModule,
    CategoryModule,
    BrandModule,
    PagesRoutingModule,
  ],
  exports: [
    AddBrandPageComponent,
    AddCategoryPageComponent,
    ListBrandsPageComponent,
    ListCategoriesPageComponent,
  ],
})
export class PageModule {}
