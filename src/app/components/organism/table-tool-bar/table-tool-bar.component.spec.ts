import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableToolBarComponent } from './table-tool-bar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AtomsModule } from '../../atoms/atoms.module';
import { TableToolBarService } from 'src/app/shared/services/table-tool-bar/table-tool-bar.service';

describe('TableToolBarComponent', () => {
  let component: TableToolBarComponent;
  let fixture: ComponentFixture<TableToolBarComponent>;
  let tableToolBarService: TableToolBarService;

  beforeEach(async () => {

    const tableToolBarServiceMock = {
      updateShowBy: jest.fn(),
      updateSortBy: jest.fn(),
    };
    await TestBed.configureTestingModule({
      declarations: [ TableToolBarComponent ],
      imports: [SharedModule, AtomsModule],
      providers: [
        { provide: TableToolBarService, useValue: tableToolBarServiceMock },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableToolBarComponent);
    tableToolBarService = TestBed.inject(TableToolBarService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a updateShowBy del servicio cuando se llama a onShowByChange', () => {
    const showByValue = '10';

    component.onShowByChange(showByValue);
    expect(tableToolBarService.updateShowBy).toHaveBeenCalledWith(showByValue);
  });

  it('debería llamar a updateSortBy del servicio cuando se llama a onSortByChange', () => {
    const sortByValue = 'nombre';
    component.onSortByChange(sortByValue);
    expect(tableToolBarService.updateSortBy).toHaveBeenCalledWith(sortByValue);
  });
});
