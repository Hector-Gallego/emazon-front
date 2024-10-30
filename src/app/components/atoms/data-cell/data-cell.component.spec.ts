import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCellComponent } from './data-cell.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('DataCellComponent', () => {
  let component: DataCellComponent;
  let fixture: ComponentFixture<DataCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataCellComponent ],
      imports: [SharedModule]

    })
    .compileComponents();

    fixture = TestBed.createComponent(DataCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
