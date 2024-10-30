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

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería emitir el evento buttonClick al hacer click en el botón', () => {
    jest.spyOn(component.buttonClick, 'emit');
    const mockEvent = new MouseEvent('click');
    component.onClick(mockEvent);
    expect(component.buttonClick.emit).toHaveBeenCalledWith(mockEvent);
  });
});
