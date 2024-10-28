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
import { MultipleInputSelectComponent } from './multiple-input-select/multiple-input-select.component';
import { CardComponent } from './card/card.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';




@NgModule({
  declarations: [
    DataTableComponent,
    HeaderComponent,
    NavBarComponent,
    PaginationComponent,
    FormComponent,
    TableToolBarComponent,
    TableToolBarComponent,
    MultipleInputSelectComponent,
    CardComponent
  ],
  imports: [SharedModule, AtomsModule, MoleculesModule, RouterModule , CoreModule],
  exports: [
    DataTableComponent,
    HeaderComponent,
    NavBarComponent,
    PaginationComponent,
    FormComponent,
    TableToolBarComponent,
    MultipleInputSelectComponent,
    CardComponent

  ],
})
export class OrganismModule {}
