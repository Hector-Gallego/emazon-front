import { NgModule } from '@angular/core';
import { ListArticlesComponent } from './list-articles/list-articles.component';
import { ArticleDetailPageComponent } from './article-detail-page/article-detail-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AtomsModule } from 'src/app/components/atoms/atoms.module';
import { MoleculesModule } from 'src/app/components/molecules/molecules.module';
import { OrganismModule } from 'src/app/components/organism/organism.module';
import { ClientRoutingModule } from './client-routing.module';
import { ShoppingCartDetailsPageComponent } from './shopping-cart-details-page/shopping-cart-details-page.component';

@NgModule({
  declarations: [ListArticlesComponent, ArticleDetailPageComponent, ShoppingCartDetailsPageComponent],
  imports: [SharedModule, AtomsModule, MoleculesModule, OrganismModule, ClientRoutingModule],
  exports: [ListArticlesComponent, ArticleDetailPageComponent],
})
export class ClientModule {}