import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DivisorComponent } from './divisor.component';
import { By } from '@angular/platform-browser';

describe('DivisorComponent', () => {
  let component: DivisorComponent;
  let fixture: ComponentFixture<DivisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DivisorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar un div con la clase "divisor"', () => {
    const divElement = fixture.debugElement.query(By.css('.divisor'));
    expect(divElement).toBeTruthy();
  });
});
