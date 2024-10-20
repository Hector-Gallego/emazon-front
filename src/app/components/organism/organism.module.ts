import { NgModule } from '@angular/core';
import { DataTableComponent } from './data-table/data-table.component';
import { HeaderComponent } from './header/header.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AtomsModule } from '../atoms/atoms.module';
import { MoleculesModule } from '../molecules/molecules.module';
import { FormComponent } from './form/form.component';
import { TableToolBarComponent } from './table-tool-bar/table-tool-bar.component';


@NgModule({
  declarations: [
    DataTableComponent,
    HeaderComponent,
    NavBarComponent,
    PaginationComponent,
    FormComponent,
    TableToolBarComponent,
    TableToolBarComponent
  ],
  imports: [SharedModule, AtomsModule, MoleculesModule],
  exports: [
    DataTableComponent,
    HeaderComponent,
    NavBarComponent,
    PaginationComponent,
    FormComponent,
    TableToolBarComponent
  ],
})
export class OrganismModule {}
