import { NgModule } from '@angular/core';
import { AtomsModule } from './atoms/atoms.module';
import { MoleculesModule } from './molecules/molecules.module';
import { OrganismModule } from './organism/organism.module';

@NgModule({
  imports: [AtomsModule, MoleculesModule, OrganismModule],
  exports: [AtomsModule, MoleculesModule, OrganismModule],
})
export class DesignSystemModule {}
