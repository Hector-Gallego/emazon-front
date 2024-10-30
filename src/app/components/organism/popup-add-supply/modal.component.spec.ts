import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAddSupplyComponent } from './popup-add-supply.component';

describe('ModalComponent', () => {
  let component: PopupAddSupplyComponent;
  let fixture: ComponentFixture<PopupAddSupplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupAddSupplyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupAddSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
