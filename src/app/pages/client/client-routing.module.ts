import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleDetailPageComponent } from './article-detail-page/article-detail-page.component';
import { ListArticlesComponent } from './list-articles/list-articles.component';
import { ClientTemplateComponent } from 'src/app/templates/client-template/client-template.component';
import { HasRoleGuard } from 'src/app/core/guards/hasRole/has-role.guard';
import { Role } from 'src/app/shared/enums/role.enum';


const routes: Routes = [
  {
    path: '',
    component: ClientTemplateComponent,
    children: [
      {
        path: 'articulos',
        component: ListArticlesComponent,
        canActivate: [HasRoleGuard],
        data: {allowRoles: [Role.CLIENT]},
      },
      {
        path: 'detalle-articulo/:id',
        component: ArticleDetailPageComponent,
        canActivate: [HasRoleGuard],
        data: {allowRoles: [Role.CLIENT]},
      },
      { path: '', redirectTo: '/articulos', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
