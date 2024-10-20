import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableToolBarComponent } from './table-tool-bar.component';

describe('TableToolBarComponent', () => {
  let component: TableToolBarComponent;
  let fixture: ComponentFixture<TableToolBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableToolBarComponent ]
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
