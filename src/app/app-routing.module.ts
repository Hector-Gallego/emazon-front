import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayaoutComponent } from './features/templates/main-layaout/main-layaout.component';
import { AddCategoryPageComponent } from './features/pages/add-category-page/add-category-page.component';
import * as path from 'path';
const routes: Routes = [
  {path:'crear-categoria', component: AddCategoryPageComponent},
  {path: '', redirectTo: '/crear-categoria', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
