import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityCounterButtonComponent } from './quantity-counter-button.component';
import { AtomsModule } from '../../atoms/atoms.module';

describe('QuantityCounterButtonComponent', () => {
  let component: QuantityCounterButtonComponent;
  let fixture: ComponentFixture<QuantityCounterButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtomsModule],
      declarations: [ QuantityCounterButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuantityCounterButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería decrementar la cantidad al llamar el metodo decrement()', () =>{

    component.quantity = 2;
    component.decrement();
    expect(component.quantity).toBe(1);

  });

  it('debería incrementar la cantidad al llamar el metodo increment()', () =>{

    component.quantity = 2;
    component.increment();
    expect(component.quantity).toBe(3);

  });
});
