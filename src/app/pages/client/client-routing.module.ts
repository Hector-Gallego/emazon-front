import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleDetailPageComponent } from './article-detail-page/article-detail-page.component';
import { ListArticlesComponent } from './list-articles/list-articles.component';
import { ClientTemplateComponent } from 'src/app/templates/client-template/client-template.component';
import { HasRoleGuard } from 'src/app/core/guards/hasRole/has-role.guard';
import { Role } from 'src/app/shared/enums/role.enum';
import { ClientRoutes } from 'src/app/shared/constants/routes.constants';
import { ShoppingCartDetailsPageComponent } from './shopping-cart-details-page/shopping-cart-details-page.component';


const routes: Routes = [
  {
    path: '',
    component: ClientTemplateComponent,
    children: [
      {
        path: ClientRoutes.ARTICLES,
        component: ListArticlesComponent,
        canActivate: [HasRoleGuard],
        data: {allowRoles: [Role.CLIENT]},
      },
      {
        path: ClientRoutes.ARTICLE_DETAIL,
        component: ArticleDetailPageComponent,
        canActivate: [HasRoleGuard],
        data: {allowRoles: [Role.CLIENT]},
      },
      {
        path: ClientRoutes.SHOPPING_CART,
        component: ShoppingCartDetailsPageComponent,
        canActivate: [HasRoleGuard],
        data: {allowRoles: [Role.CLIENT]},
      },
      { path: '', redirectTo: ClientRoutes.ARTICLES, pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
