import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryPageComponent } from './features/pages/add-category-page/add-category-page.component';
import { ListCategoriesPageComponent } from './features/pages/list-categories-page/list-categories-page.component';
import { AddBrandPageComponent } from './features/pages/add-brand-page/add-brand-page.component';
import { ListBrandsPageComponent } from './features/pages/list-brands-page/list-brands-page.component';
const routes: Routes = [
  {path:'crear-categoria', component: AddCategoryPageComponent},
  {path: 'crear-marca', component: AddBrandPageComponent},
  {path: 'marcas', component: ListBrandsPageComponent},
  {path:'categorias', component: ListCategoriesPageComponent},
  {path: '', redirectTo: '/categorias', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
