import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryPageComponent } from './add-category-page/add-category-page.component';
import { ListCategoriesPageComponent } from './list-categories-page/list-categories-page.component';
import { AddBrandPageComponent } from './add-brand-page/add-brand-page.component';
import { ListBrandsPageComponent } from './list-brands-page/list-brands-page.component';

const routes: Routes = [
  { path: 'crear-categoria', component: AddCategoryPageComponent },
  { path: 'crear-marca', component: AddBrandPageComponent },
  { path: 'marcas', component: ListBrandsPageComponent },
  { path: 'categorias', component: ListCategoriesPageComponent },
  { path: '', redirectTo: '/categorias', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
