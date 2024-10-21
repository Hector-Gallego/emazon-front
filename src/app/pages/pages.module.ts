import { NgModule } from '@angular/core';
import { AddBrandPageComponent } from './add-brand-page/add-brand-page.component';
import { AddCategoryPageComponent } from './add-category-page/add-category-page.component';
import { ListBrandsPageComponent } from './list-brands-page/list-brands-page.component';
import { ListCategoriesPageComponent } from './list-categories-page/list-categories-page.component';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { OrganismModule } from '../components/organism/organism.module';
import { AtomsModule } from '../components/atoms/atoms.module';
import { MoleculesModule } from '../components/molecules/molecules.module';
import { AddArticlePageComponent } from './add-article-page/add-article-page.component';

@NgModule({
  declarations: [
    AddBrandPageComponent,
    AddCategoryPageComponent,
    ListBrandsPageComponent,
    ListCategoriesPageComponent,
    AddArticlePageComponent,
  ],
  imports: [
    SharedModule,
    PagesRoutingModule,
    AtomsModule,
    MoleculesModule,
    OrganismModule
  ],
  exports: [
    AddBrandPageComponent,
    AddCategoryPageComponent,
    ListBrandsPageComponent,
    ListCategoriesPageComponent,
  ],
})
export class PageModule {}
