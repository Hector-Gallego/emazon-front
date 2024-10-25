import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleDetailPageComponent } from './article-detail-page/article-detail-page.component';
import { ListArticlesComponent } from './list-articles/list-articles.component';
import { ClientLayaoutComponent } from 'src/app/templates/client-layaout/client-layaout.component';

const routes: Routes = [
  {
    path: '',
    component: ClientLayaoutComponent,
    children: [
      { path: 'articulos', component: ListArticlesComponent },
      { path: 'detalle-articulo/:id', component: ArticleDetailPageComponent },
      { path: '', redirectTo: '/articulos', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
