import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryPageComponent } from './add-category-page/add-category-page.component';
import { AddBrandPageComponent } from './add-brand-page/add-brand-page.component';
import { AddArticlePageComponent } from './add-article-page/add-article-page.component';
import { ListBrandsPageComponent } from './list-brands-page/list-brands-page.component';
import { ListCategoriesPageComponent } from './list-categories-page/list-categories-page.component';
import { AdminTemplateComponent } from 'src/app/templates/admin-template/admin-template.component';
import { AddWarehouseAssistantPageComponent } from './add-warehouse-assistant-page/add-warehouse-assistant-page.component';
import {  HasRoleGuard} from 'src/app/core/guards/hasRole/has-role.guard';
import { Role } from 'src/app/shared/enums/role.enum';

const routes: Routes = [
  {
    path: '',
    component: AdminTemplateComponent,
    children: [
      {
        path: 'crear-categoria',
        component: AddCategoryPageComponent,
        canActivate: [HasRoleGuard],
        data: {allowRoles: [Role.ADMIN, Role.WAREHOUSE_ASSISTANT]},
      },
      {
        path: 'crear-marca',
        component: AddBrandPageComponent,
        canActivate: [HasRoleGuard],
        data: {allowRoles: [Role.ADMIN, Role.WAREHOUSE_ASSISTANT]},
      },
      {
        path: 'crear-articulo',
        component: AddArticlePageComponent,
        canActivate: [HasRoleGuard],
        data: {allowRoles: [Role.ADMIN, Role.WAREHOUSE_ASSISTANT]},
      },
      {
        path: 'marcas',
        component: ListBrandsPageComponent,
        canActivate: [HasRoleGuard],
        data: {allowRoles: [Role.ADMIN, Role.WAREHOUSE_ASSISTANT]},
      },
      {
        path: 'categorias',
        component: ListCategoriesPageComponent,
        canActivate: [HasRoleGuard],
        data: {allowRoles: [Role.ADMIN, Role.WAREHOUSE_ASSISTANT]},
      },
      {
        path: 'crear-auxiliar',
        component: AddWarehouseAssistantPageComponent,
        canActivate: [HasRoleGuard],
        data: {allowRoles: [Role.ADMIN]},
      },

      { path: '', redirectTo: 'categorias', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
