import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryPageComponent } from './add-category-page/add-category-page.component';
import { AddBrandPageComponent } from './add-brand-page/add-brand-page.component';
import { AddArticlePageComponent } from './add-article-page/add-article-page.component';
import { ListBrandsPageComponent } from './list-brands-page/list-brands-page.component';
import { ListCategoriesPageComponent } from './list-categories-page/list-categories-page.component';
import { MainLayaoutComponent } from 'src/app/templates/main-layaout/main-layaout.component';
import { AddWarehouseAssistantPageComponent } from './add-warehouse-assistant-page/add-warehouse-assistant-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayaoutComponent, 
    children: [
      { path: 'crear-categoria', component: AddCategoryPageComponent },
      { path: 'crear-marca', component: AddBrandPageComponent },
      { path: 'crear-articulo', component: AddArticlePageComponent },
      { path: 'marcas', component: ListBrandsPageComponent },
      { path: 'categorias', component: ListCategoriesPageComponent },
      { path: 'crear-auxiliar', component: AddWarehouseAssistantPageComponent },

      { path: '', redirectTo: 'categorias', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
