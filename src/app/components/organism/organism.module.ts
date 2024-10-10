import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AtomsModule } from "../atoms/atoms.module";
import { CommonModule } from "@angular/common";
import { CategoryFormComponent } from "./category-form/category-form.component";
import { HeaderComponent } from "./header/header.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { DataTableComponent } from './data-table/data-table.component';
import { PaginatonComponent } from './paginaton/paginaton.component';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MoleculesModule } from "../molecules/molecules.module";


@NgModule({
    declarations:[
        CategoryFormComponent,
        HeaderComponent,
        NavBarComponent,
        DataTableComponent,
        PaginatonComponent,
        
   
    ],
    imports: [
    FormsModule,
    ReactiveFormsModule,
    AtomsModule,
    CommonModule,
    FontAwesomeModule,
    MoleculesModule
],
    exports: [ 
        CategoryFormComponent,
        HeaderComponent,
        NavBarComponent,
        DataTableComponent,
        PaginatonComponent ]

})

export class OrganismModule{}