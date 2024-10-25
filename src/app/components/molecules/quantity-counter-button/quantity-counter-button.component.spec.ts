import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityCounterButtonComponent } from './quantity-counter-button.component';

describe('QuantityCounterButtonComponent', () => {
  let component: QuantityCounterButtonComponent;
  let fixture: ComponentFixture<QuantityCounterButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuantityCounterButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuantityCounterButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
