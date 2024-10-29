import { NgModule } from "@angular/core";
import { AddBrandPageComponent } from "./add-brand-page/add-brand-page.component";
import { AddCategoryPageComponent } from "./add-category-page/add-category-page.component";
import { ListBrandsPageComponent } from "./list-brands-page/list-brands-page.component";
import { ListCategoriesPageComponent } from "./list-categories-page/list-categories-page.component";
import { AddArticlePageComponent } from "./add-article-page/add-article-page.component";
import { SharedModule } from "src/app/shared/shared.module";
import { AtomsModule } from "src/app/components/atoms/atoms.module";
import { MoleculesModule } from "src/app/components/molecules/molecules.module";
import { OrganismModule } from "src/app/components/organism/organism.module";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminTemplateComponent } from "src/app/templates/admin-template/admin-template.component";
import { AddWarehouseAssistantPageComponent } from './add-warehouse-assistant-page/add-warehouse-assistant-page.component';

@NgModule({
    declarations: [
      AddBrandPageComponent,
      AddCategoryPageComponent,
      ListBrandsPageComponent,
      ListCategoriesPageComponent,
      AddArticlePageComponent,
      AddWarehouseAssistantPageComponent,
    ],
    imports: [
      SharedModule,
      AtomsModule,
      MoleculesModule,
      OrganismModule,
      AdminRoutingModule
    ],
    exports: [
      AddBrandPageComponent,
      AddCategoryPageComponent,
      ListBrandsPageComponent,
      ListCategoriesPageComponent,
      AddWarehouseAssistantPageComponent

    ],
  })
  export class AdminModule {}