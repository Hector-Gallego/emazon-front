import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableToolBarComponent } from './table-tool-bar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AtomsModule } from '../../atoms/atoms.module';

describe('TableToolBarComponent', () => {
  let component: TableToolBarComponent;
  let fixture: ComponentFixture<TableToolBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableToolBarComponent ],
      imports: [SharedModule, AtomsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
