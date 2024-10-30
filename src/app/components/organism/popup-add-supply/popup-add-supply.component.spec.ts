import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAddSupplyComponent } from './popup-add-supply.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AtomsModule } from '../../atoms/atoms.module';

describe('ModalComponent', () => {
  let component: PopupAddSupplyComponent;
  let fixture: ComponentFixture<PopupAddSupplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupAddSupplyComponent ],
      imports: [SharedModule, AtomsModule]
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
