import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { AddCategoryPageComponent } from "./pages/add-category-page/add-category-page.component";
import { MainLayaoutComponent } from "./templates/main-layaout/main-layaout.component";
import { OrganismModule } from "../components/organism/organism.module";
import { AppRoutingModule } from "../app-routing.module";
import { MoleculesModule } from "../components/molecules/molecules.module";
import { ListCategoriesPageComponent } from './pages/list-categories-page/list-categories-page.component';
import { AtomsModule } from "../components/atoms/atoms.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
@NgModule({
    declarations:[
     AddCategoryPageComponent,
     MainLayaoutComponent,
     ListCategoriesPageComponent

    ],
    imports: [
    CommonModule,
    OrganismModule,
    AppRoutingModule,
    MoleculesModule,
    AtomsModule,
    FontAwesomeModule
],

    exports: [
        AddCategoryPageComponent,
        MainLayaoutComponent,
        ListCategoriesPageComponent
    ]

})

export class FeaturesModule{}