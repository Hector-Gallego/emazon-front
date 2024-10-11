import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayaoutComponent } from './features/templates/main-layaout/main-layaout.component';
import { AddCategoryPageComponent } from './features/pages/add-category-page/add-category-page.component';
import * as path from 'path';
import { ListCategoriesPageComponent } from './features/pages/list-categories-page/list-categories-page.component';
import { AddBrandPageComponent } from './features/pages/add-brand-page/add-brand-page.component';
const routes: Routes = [
  {path:'crear-categoria', component: AddCategoryPageComponent},
  {path: 'crear-marca', component: AddBrandPageComponent},
  {path:'categorias', component: ListCategoriesPageComponent},
  {path: '', redirectTo: '/categorias', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
