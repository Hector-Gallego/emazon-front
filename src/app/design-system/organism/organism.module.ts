import { NgModule } from '@angular/core';
import { DataTableComponent } from './data-table/data-table.component';
import { HeaderComponent } from './header/header.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AtomsModule } from '../atoms/atoms.module';
import { MoleculesModule } from '../molecules/molecules.module';

@NgModule({
  declarations: [
    DataTableComponent,
    HeaderComponent,
    NavBarComponent,
    PaginationComponent,
  ],
  imports: [SharedModule, AtomsModule, MoleculesModule],
  exports: [
    DataTableComponent,
    HeaderComponent,
    NavBarComponent,
    PaginationComponent,
  ],
})
export class OrganismModule {}
